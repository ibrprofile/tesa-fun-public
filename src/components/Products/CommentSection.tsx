
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Reply, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface CommentAuthor {
  id: number;
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  author: CommentAuthor;
  text: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  productId: string | number;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ productId, initialComments = [] }) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ comment: string }>();
  
  const onSubmitComment = (data: { comment: string }) => {
    const newComment: Comment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      author: {
        id: 101, // Assuming current user
        name: "Вы",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      text: data.comment,
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0
    };
    
    setComments([newComment, ...comments]);
    reset();
    
    toast({
      title: language === 'ru' ? "Комментарий добавлен" : "Comment added",
      description: language === 'ru' ? "Ваш комментарий успешно опубликован." : "Your comment has been successfully published.",
      variant: "default",
    });
  };
  
  const onSubmitReply = (commentId: number, replyText: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const replies = comment.replies || [];
        const newReply: Comment = {
          id: replies.length > 0 ? Math.max(...replies.map(r => r.id)) + 1 : 1,
          author: {
            id: 101, // Assuming current user
            name: "Вы",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          text: replyText,
          createdAt: new Date().toISOString(),
          likes: 0,
          dislikes: 0
        };
        
        return {
          ...comment,
          replies: [...replies, newReply]
        };
      }
      return comment;
    }));
    
    setReplyingTo(null);
    
    toast({
      title: language === 'ru' ? "Ответ добавлен" : "Reply added",
      description: language === 'ru' ? "Ваш ответ успешно опубликован." : "Your reply has been successfully published.",
      variant: "default",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">{language === 'ru' ? "Отзывы и комментарии" : "Reviews and Comments"}</h3>
      
      {/* Add new comment form */}
      <form onSubmit={handleSubmit(onSubmitComment)} className="glass p-4 rounded-lg space-y-4">
        <Textarea
          placeholder={language === 'ru' ? "Напишите ваш комментарий..." : "Write your comment..."}
          {...register('comment', { required: language === 'ru' ? "Комментарий не может быть пустым" : "Comment cannot be empty" })}
          className={errors.comment ? "border-destructive" : ""}
        />
        {errors.comment && (
          <p className="text-sm text-destructive">{errors.comment.message}</p>
        )}
        <div className="flex justify-end">
          <Button type="submit">{language === 'ru' ? "Отправить" : "Submit"}</Button>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6 mt-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-foreground/70">
            {language === 'ru' ? "Пока нет комментариев. Будьте первым!" : "No comments yet. Be the first!"}
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="glass p-4 rounded-lg">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{comment.author.name}</h4>
                      <p className="text-xs text-foreground/60">{formatDate(comment.createdAt)}</p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                          <span className="sr-only">{language === 'ru' ? "Ещё" : "More"}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>{language === 'ru' ? "Пожаловаться" : "Report"}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <p className="mt-2">{comment.text}</p>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <button className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors">
                      <ThumbsUp size={16} />
                      <span>{comment.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors">
                      <ThumbsDown size={16} />
                      <span>{comment.dislikes}</span>
                    </button>
                    
                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} 
                      className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <Reply size={16} />
                      <span>{language === 'ru' ? "Ответить" : "Reply"}</span>
                    </button>
                  </div>
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-border">
                      <Textarea
                        placeholder={language === 'ru' ? "Ваш ответ..." : "Your reply..."}
                        className="text-sm mb-2"
                        onChange={(e) => e.target.value}
                        id={`reply-${comment.id}`}
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          {language === 'ru' ? "Отмена" : "Cancel"}
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            const textarea = document.getElementById(`reply-${comment.id}`) as HTMLTextAreaElement;
                            if (textarea && textarea.value.trim()) {
                              onSubmitReply(comment.id, textarea.value);
                            }
                          }}
                        >
                          {language === 'ru' ? "Ответить" : "Reply"}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-border space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="bg-secondary/20 p-3 rounded-lg">
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-sm">{reply.author.name}</h5>
                                  <p className="text-xs text-foreground/60">{formatDate(reply.createdAt)}</p>
                                </div>
                              </div>
                              
                              <p className="mt-1 text-sm">{reply.text}</p>
                              
                              <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors">
                                  <ThumbsUp size={14} />
                                  <span>{reply.likes}</span>
                                </button>
                                
                                <button className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors">
                                  <ThumbsDown size={14} />
                                  <span>{reply.dislikes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
