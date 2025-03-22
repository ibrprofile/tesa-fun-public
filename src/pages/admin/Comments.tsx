
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useLanguage } from '@/context/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Mock comments data
const mockComments = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  productId: Math.floor(Math.random() * 10) + 1,
  productName: `Product ${Math.floor(Math.random() * 10) + 1}`,
  userId: Math.floor(Math.random() * 100) + 1,
  userName: `User ${Math.floor(Math.random() * 100) + 1}`,
  content: [
    "Great product, very satisfied with the quality!",
    "Not bad, but could be better for the price.",
    "Exactly what I was looking for!",
    "The description wasn't very accurate...",
    "I highly recommend this to everyone!"
  ][Math.floor(Math.random() * 5)],
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  status: ['published', 'pending', 'flagged', 'removed'][Math.floor(Math.random() * 4)],
  reports: Math.floor(Math.random() * 5),
}));

const ITEMS_PER_PAGE = 10;

const Comments = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State variables
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [isCommentDetailOpen, setIsCommentDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [comments, setComments] = useState(mockComments);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Filter comments based on search term
  const filteredComments = comments.filter(comment => 
    comment.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
    comment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredComments.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedComments = filteredComments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'flagged':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'removed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300';
    }
  };
  
  const handleViewComment = (comment: any) => {
    setSelectedComment(comment);
    setIsCommentDetailOpen(true);
  };
  
  const handleDeleteComment = (comment: any) => {
    setSelectedComment(comment);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteComment = async () => {
    if (!selectedComment) return;
    
    setIsProcessing(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем состояние комментариев, удаляя выбранный
      setComments(comments.filter(comment => comment.id !== selectedComment.id));
      
      toast({
        title: t('comment_deleted'),
        description: t('comment_deleted_success'),
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: t('error'),
        description: t('error_deleting_comment'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleEditComment = async (editedContent: string) => {
    if (!selectedComment) return;
    
    setIsProcessing(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем состояние комментариев
      setComments(comments.map(comment => 
        comment.id === selectedComment.id 
          ? {...comment, content: editedContent} 
          : comment
      ));
      
      toast({
        title: t('comment_updated'),
        description: t('comment_updated_success'),
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      toast({
        title: t('error'),
        description: t('error_updating_comment'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setIsCommentDetailOpen(false);
    }
  };
  
  const handleApproveComment = async (commentId: number) => {
    setIsProcessing(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем состояние комментариев
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? {...comment, status: 'published'} 
          : comment
      ));
      
      toast({
        title: t('comment_approved'),
        description: t('comment_status_updated'),
      });
    } catch (error) {
      console.error('Error approving comment:', error);
      toast({
        title: t('error'),
        description: t('error_approving_comment'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleFlagComment = async (commentId: number) => {
    setIsProcessing(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем состояние комментариев
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? {...comment, status: 'flagged'} 
          : comment
      ));
      
      toast({
        title: t('comment_flagged'),
        description: t('comment_status_updated'),
      });
    } catch (error) {
      console.error('Error flagging comment:', error);
      toast({
        title: t('error'),
        description: t('error_flagging_comment'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('comments_management')}</h1>
          
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('search_comments')}
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>{t('user')}</TableHead>
                <TableHead>{t('product_name')}</TableHead>
                <TableHead className="w-[300px]">{t('comment')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('reports')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">{comment.id}</TableCell>
                  <TableCell>{comment.userName}</TableCell>
                  <TableCell>{comment.productName}</TableCell>
                  <TableCell className="max-w-xs truncate">{comment.content}</TableCell>
                  <TableCell>{formatDateTime(comment.date)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeStyles(comment.status)}>
                      {comment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{comment.reports}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewComment(comment)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteComment(comment)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {comment.status === 'pending' && (
                        <Button variant="ghost" size="icon" onClick={() => handleApproveComment(comment.id)}>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      {comment.status !== 'flagged' && comment.status !== 'removed' && (
                        <Button variant="ghost" size="icon" onClick={() => handleFlagComment(comment.id)}>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                {t('showing')} {startIndex + 1} {t('to')} {Math.min(startIndex + ITEMS_PER_PAGE, filteredComments.length)} {t('of')} {filteredComments.length} {t('comments')}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNumber = i + 1;
                  if (totalPages > 5 && page > 3) {
                    pageNumber = Math.min(page + i - 2, totalPages - 4 + i);
                  }
                  return (
                    <Button
                      key={pageNumber}
                      variant={page === pageNumber ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(pageNumber)}
                      className="h-8 w-8"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Comment Detail Dialog */}
      <Dialog open={isCommentDetailOpen} onOpenChange={setIsCommentDetailOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('user_details')}</DialogTitle>
            <DialogDescription>
              {t('view_edit_comment')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedComment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('comment_id')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedComment.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('product_name')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedComment.productName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('user')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedComment.userName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('date')}:</p>
                  <p className="text-sm text-muted-foreground">{formatDateTime(selectedComment.date)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('status')}:</p>
                  <Badge className={getStatusBadgeStyles(selectedComment.status)}>
                    {selectedComment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{t('reports')}:</p>
                  <p className="text-sm text-muted-foreground">{selectedComment.reports}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">{t('comment_content')}:</p>
                <Textarea
                  value={selectedComment.content}
                  onChange={(e) => setSelectedComment({...selectedComment, content: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCommentDetailOpen(false)}>
              {t('cancel')}
            </Button>
            {selectedComment && (
              <Button
                variant="default"
                onClick={() => handleEditComment(selectedComment.content)}
              >
                {t('save_changes')}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Comment Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{t('delete_comment')}</DialogTitle>
            <DialogDescription>
              {t('delete_comment_confirmation')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedComment && (
            <div className="py-4">
              <p className="text-sm mb-2">
                <span className="font-medium">{t('user')}:</span> {selectedComment.userName}
              </p>
              <p className="text-sm mb-4">
                <span className="font-medium">{t('comment')}:</span> {selectedComment.content}
              </p>
              <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 text-sm text-center">
                <AlertCircle className="mx-auto h-6 w-6 text-destructive mb-2" />
                {t('delete_comment_warning')}
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteComment}
            >
              {t('confirm_delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Comments;
