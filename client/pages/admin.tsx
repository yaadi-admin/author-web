import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { 
  blogPosts, 
  categories, 
  type BlogPost, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost, 
  getAllBlogPosts,
  setBlogPosts 
} from '../data/blog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Switch } from '../components/ui/switch';
import { toast } from '../components/ui/use-toast';
import { Pencil, Trash2, Plus, Eye, Save, X } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface BlogFormData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
}

const initialFormData: BlogFormData = {
  id: '',
  title: '',
  excerpt: '',
  content: '',
  author: 'Suzanna Griffiths',
  authorImage: 'https://api.builder.io/api/v1/image/assets/TEMP/9ef2ef4ab7707f0aa3dc051ca846715a652746d4?width=1206',
  publishDate: new Date().toISOString().split('T')[0],
  readTime: '',
  category: 'Healing',
  tags: [],
  featuredImage: '',
  featured: false
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [plainTextContent, setPlainTextContent] = useState('');

  // Load initial data
  useEffect(() => {
    setPosts(getAllBlogPosts());
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const generateId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  };

  const estimateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const convertPlainTextToHTML = (plainText: string): string => {
    if (!plainText.trim()) return '';
    
    // Split by double line breaks to identify paragraphs
    const paragraphs = plainText
      .split(/\n\s*\n/)
      .filter(p => p.trim())
      .map(p => p.trim().replace(/\n/g, ' ')); // Replace single line breaks with spaces
    
    // Wrap each paragraph in clean HTML - let prose styles handle spacing
    return paragraphs
      .map(paragraph => {
        // Escape HTML entities for security
        const escapedParagraph = paragraph
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
        
        return `<p>${escapedParagraph}</p>`;
      })
      .join('\n\n');
  };

  const convertHTMLToPlainText = (html: string): string => {
    if (!html.trim()) return '';
    
    // Remove HTML tags and convert back to plain text with paragraph breaks
    return html
      .replace(/<p[^>]*>/gi, '')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple line breaks
      .trim();
  };

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setCurrentPost(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !editingId ? { id: generateId(value) } : {}),
      ...(field === 'content' ? { readTime: estimateReadTime(value) } : {})
    }));
  };

  const handleContentChange = (plainText: string) => {
    setPlainTextContent(plainText);
    const htmlContent = convertPlainTextToHTML(plainText);
    setCurrentPost(prev => ({
      ...prev,
      content: htmlContent,
      readTime: estimateReadTime(htmlContent)
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !currentPost.tags.includes(tagInput.trim())) {
      setCurrentPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setCurrentPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.excerpt || !currentPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (title, excerpt, content).",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingId) {
        // Update existing post
        updateBlogPost({ ...currentPost });
        setPosts(getAllBlogPosts());
        toast({
          title: "Success",
          description: "Blog post updated successfully!"
        });
      } else {
        // Create new post
        const newPost = { ...currentPost };
        addBlogPost(newPost);
        setPosts(getAllBlogPosts());
        toast({
          title: "Success",
          description: "New blog post created successfully!"
        });
      }
      
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setPlainTextContent(convertHTMLToPlainText(post.content));
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (postId: string) => {
    try {
      deleteBlogPost(postId);
      setPosts(getAllBlogPosts());
      toast({
        title: "Success",
        description: "Blog post deleted successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setCurrentPost(initialFormData);
    setPlainTextContent('');
    setEditingId(null);
    setShowForm(false);
    setShowPreview(false);
    setTagInput('');
  };



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#F1E6DB] via-[#E0B2F1] to-[#FFE4EE] min-h-screen">
      <Header whiteText={true} />
      
      <div className="pt-24 px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-black mb-4">
              Blog Administration
            </h1>
            <p className="font-helvetica text-lg text-black/70 mb-6">
              Create, edit, and manage your blog posts
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <Button 
                onClick={() => setShowForm(true)} 
                className="bg-[#F84988] text-white hover:bg-[#e03a7a] flex items-center gap-2"
              >
                <Plus size={16} />
                Create New Post
              </Button>
              
              <div className="flex gap-4 flex-wrap">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="grid gap-6">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="text-center">
                    <h3 className="font-playfair text-2xl font-bold text-black mb-2">No posts found</h3>
                    <p className="font-helvetica text-black/70 mb-4">
                      {posts.length === 0 ? "Create your first blog post to get started." : "Try adjusting your search or filter criteria."}
                    </p>
                    <Button onClick={() => setShowForm(true)} className="bg-[#F84988] text-white hover:bg-[#e03a7a]">
                      <Plus size={16} className="mr-2" />
                      Create New Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map(post => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Post Image */}
                      <div className="lg:w-48 flex-shrink-0">
                        <img
                          src={post.featuredImage || '/placeholder.svg'}
                          alt={post.title}
                          className="w-full h-32 lg:h-40 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Post Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={post.featured ? "default" : "secondary"} className="bg-[#F84988] text-white">
                                {post.category}
                              </Badge>
                              {post.featured && (
                                <Badge variant="outline" className="border-[#F84988] text-[#F84988]">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-playfair text-xl font-bold text-black mb-2 truncate">
                              {post.title}
                            </h3>
                            <p className="font-helvetica text-sm text-black/70 mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-black/50">
                              <span>{formatDate(post.publishDate)}</span>
                              <span>{post.readTime}</span>
                              <span>{post.tags.length} tags</span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(post)}
                              className="border-[#F84988] text-[#F84988] hover:bg-[#F84988] hover:text-white"
                            >
                              <Pencil size={14} />
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{post.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-red-500 hover:bg-red-600">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        {/* Tags Preview */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs border-[#F84988]/30 text-[#F84988]">
                              #{tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs border-[#F84988]/30 text-[#F84988]">
                              +{post.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Blog Form Modal */}
      <Dialog open={showForm} onOpenChange={(open) => {
        if (!open) resetForm();
        setShowForm(open);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">
              {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={currentPost.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter blog post title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="id">URL ID</Label>
                  <Input
                    id="id"
                    value={currentPost.id}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    placeholder="Generated from title"
                    disabled={!!editingId}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={currentPost.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the blog post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={plainTextContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Write your blog content here. Simply type naturally and separate paragraphs with double line breaks.&#10;&#10;Example:&#10;Healing is not a destination; it's a journey. Some days will be easier than others. Some wounds may take longer to heal than others.&#10;&#10;Remember, you don't have to do this alone. God is with you every step of the way, and there are people who want to walk alongside you.&#10;&#10;Your healing is holy. Your voice is needed. Your purpose is still alive."
                  rows={12}
                  className="text-sm leading-relaxed"
                />
                <div className="text-sm text-gray-500 mt-1">
                  ✨ <strong>Auto-formatting enabled:</strong> Write naturally and your text will be beautifully formatted with proper paragraph spacing. Double line breaks create new paragraphs. Estimated read time: {estimateReadTime(currentPost.content)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={currentPost.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'All').map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={currentPost.publishDate}
                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={currentPost.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={currentPost.readTime}
                    onChange={(e) => handleInputChange('readTime', e.target.value)}
                    placeholder="e.g., 5 min read"
                  />
                </div>
              </div>

              <ImageUpload
                label="Featured Image"
                value={currentPost.featuredImage}
                onChange={(url) => handleInputChange('featuredImage', url)}
                placeholder="https://example.com/image.jpg"
              />

              <ImageUpload
                label="Author Image"
                value={currentPost.authorImage}
                onChange={(url) => handleInputChange('authorImage', url)}
                placeholder="https://example.com/author.jpg"
              />

              {/* Tags */}
              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                  />
                  <Button type="button" onClick={handleTagAdd} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentPost.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      #{tag}
                      <X size={12} className="cursor-pointer" onClick={() => handleTagRemove(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={currentPost.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="bg-[#F84988] text-white hover:bg-[#e03a7a] flex items-center gap-2">
                  <Save size={16} />
                  {editingId ? 'Update Post' : 'Create Post'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              {/* Preview Content */}
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                <div className="max-w-4xl mx-auto">
                  {/* Blog Post Preview Header */}
                  <div className="text-center mb-8">
                    <Badge className="bg-[#F84988] text-white mb-4">
                      {currentPost.category}
                    </Badge>
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-4">
                      {currentPost.title || 'Blog Post Title'}
                    </h1>
                    <p className="font-helvetica text-lg text-black/70 mb-6">
                      {currentPost.excerpt || 'Blog post excerpt will appear here...'}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={currentPost.authorImage || '/placeholder.svg'}
                        alt={currentPost.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-helvetica font-semibold text-black">{currentPost.author}</p>
                        <p className="font-helvetica text-sm text-black/70">
                          {formatDate(currentPost.publishDate)} • {currentPost.readTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  {currentPost.featuredImage && (
                    <div className="mb-8">
                      <img
                        src={currentPost.featuredImage}
                        alt={currentPost.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content Preview */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <div 
                      className="font-helvetica text-lg leading-relaxed text-black [&>p]:mb-6 [&>p]:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: currentPost.content || '<p>Blog content will appear here...</p>' }}
                    />
                  </div>

                  {/* Tags */}
                  {currentPost.tags.length > 0 && (
                    <div className="border-t border-black/10 pt-6">
                      <h3 className="font-playfair text-xl font-bold text-black mb-4">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentPost.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-[#F84988]/30 text-[#F84988]">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
