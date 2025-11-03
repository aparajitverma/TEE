'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Calendar,
  Clock,
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  
  // Publishing
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  publishTime: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    category: '',
    tags: [],
    author: 'Admin',
    featuredImage: '',
    excerpt: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    publishTime: new Date().toTimeString().slice(0, 5),
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const updateFormData = (data: Partial<BlogFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    updateFormData({ 
      title,
      slug: generateSlug(title),
      metaTitle: title.slice(0, 60)
    });
  };

  const calculateSeoScore = () => {
    let score = 0;
    const checks = {
      hasTitle: formData.metaTitle.length > 0,
      titleLength: formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60,
      hasDescription: formData.metaDescription.length > 0,
      descriptionLength: formData.metaDescription.length >= 150 && formData.metaDescription.length <= 160,
      hasKeyword: formData.focusKeyword.length > 0,
      keywordInTitle: formData.metaTitle.toLowerCase().includes(formData.focusKeyword.toLowerCase()),
      keywordInDescription: formData.metaDescription.toLowerCase().includes(formData.focusKeyword.toLowerCase()),
      hasSlug: formData.slug.length > 0,
    };

    if (checks.hasTitle) score += 15;
    if (checks.titleLength) score += 15;
    if (checks.hasDescription) score += 15;
    if (checks.descriptionLength) score += 15;
    if (checks.hasKeyword) score += 10;
    if (checks.keywordInTitle) score += 15;
    if (checks.keywordInDescription) score += 10;
    if (checks.hasSlug) score += 5;

    return { score, checks };
  };

  const seoAnalysis = calculateSeoScore();

  const handleSave = async (publishStatus: 'draft' | 'published' | 'scheduled') => {
    setIsSaving(true);
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('Please enter a title');
        setIsSaving(false);
        return;
      }
      if (!formData.content.trim()) {
        alert('Please enter some content');
        setIsSaving(false);
        return;
      }
      if (!formData.category) {
        alert('Please select a category');
        setIsSaving(false);
        return;
      }

      const payload = {
        ...formData,
        status: publishStatus,
        tags: formData.tags.length > 0 ? formData.tags : [],
        scheduledDate: publishStatus === 'scheduled' 
          ? `${formData.publishDate}T${formData.publishTime}:00.000Z`
          : null,
      };

      const response = await fetch('/api/website/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Blog post ${publishStatus === 'published' ? 'published' : 'saved as ' + publishStatus} successfully!`);
        router.push('/admin/website/blog');
      } else {
        alert('Failed to save blog post: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save blog post');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle formatting insertion
  const insertFormatting = (before: string, after: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let newText;
    if (selectedText) {
      // Wrap selected text
      newText = before + selectedText + after;
    } else {
      // Insert placeholder
      newText = before + placeholder + after;
    }

    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);

    updateFormData({ content: newContent });

    // Set cursor position
    setTimeout(() => {
      const newPosition = selectedText 
        ? start + before.length + selectedText.length + after.length
        : start + before.length + placeholder.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 0);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case 'b':
          event.preventDefault();
          insertFormatting('**', '**', 'Bold text');
          break;
        case 'i':
          event.preventDefault();
          insertFormatting('*', '*', 'Italic text');
          break;
        case 'k':
          event.preventDefault();
          insertFormatting('[', '](url)', 'Link text');
          break;
      }
    }
  };

  // Handle image paste
  const handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    // Look for image in clipboard
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        
        const file = item.getAsFile();
        if (!file) continue;

        setIsUploadingImage(true);
        
        try {
          const uploadFormData = new FormData();
          uploadFormData.append('image', file);

          const response = await fetch('/api/website/blog/images', {
            method: 'POST',
            body: uploadFormData,
          });

          const data = await response.json();

          if (response.ok) {
            // Insert image markdown at cursor position
            const textarea = textareaRef.current;
            const imageMarkdown = `![Pasted Image](${data.url})`;
            
            if (textarea) {
              const start = textarea.selectionStart || 0;
              const end = textarea.selectionEnd || 0;
              
              const newContent = 
                formData.content.substring(0, start) + 
                imageMarkdown + 
                formData.content.substring(end);
              
              updateFormData({ content: newContent });
              
              // Set cursor after inserted text
              setTimeout(() => {
                const newPosition = start + imageMarkdown.length;
                textarea.setSelectionRange(newPosition, newPosition);
                textarea.focus();
              }, 0);
            } else {
              // Fallback: append to end of content
              const newContent = formData.content + '\n' + imageMarkdown;
              updateFormData({ content: newContent });
            }
          } else {
            alert('Failed to upload image: ' + data.error);
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Failed to upload image');
        } finally {
          setIsUploadingImage(false);
        }
        
        break;
      }
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/website?tab=blog')}
              className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Blog Post</h1>
              <p className="text-gray-400">Write and publish your blog content</p>
            </div>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateFormData({ slug: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="blog-post-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /blog/{formData.slug || 'blog-post-slug'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateFormData({ category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">Select category</option>
                      <option value="industry-news">Industry News</option>
                      <option value="product-guide">Product Guide</option>
                      <option value="export-tips">Export Tips</option>
                      <option value="success-stories">Success Stories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Author
                    </label>
                    <select
                      value={formData.author}
                      onChange={(e) => updateFormData({ author: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Excerpt (150 words)
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => updateFormData({ excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Brief summary of the blog post"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.excerpt.split(' ').filter(w => w).length} / 150 words
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                    {isUploadingImage && (
                      <span className="ml-2 text-purple-400 text-sm">
                        📤 Uploading pasted image...
                      </span>
                    )}
                  </label>
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    {/* Rich Text Toolbar */}
                    <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**', 'Bold text')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm font-bold"
                        title="Bold (Ctrl+B)"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*', 'Italic text')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm italic"
                        title="Italic (Ctrl+I)"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('# ', '', 'Heading 1')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Heading 1"
                      >
                        H1
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('## ', '', 'Heading 2')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('### ', '', 'Heading 3')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <div className="w-px h-6 bg-gray-600"></div>
                      <button
                        type="button"
                        onClick={() => insertFormatting('- ', '', 'List item')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Bullet List"
                      >
                        • List
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('1. ', '', 'Numbered item')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Numbered List"
                      >
                        1. List
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('> ', '', 'Quote text')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Quote"
                      >
                        Quote
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('`', '`', 'code')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm font-mono"
                        title="Inline Code"
                      >
                        Code
                      </button>
                      <div className="w-px h-6 bg-gray-600"></div>
                      <button
                        type="button"
                        onClick={() => insertFormatting('[', '](url)', 'Link text')}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                        title="Link"
                      >
                        🔗 Link
                      </button>
                      <div className="ml-auto text-xs text-gray-400">
                        💡 Paste images directly (Ctrl+V) to upload
                      </div>
                    </div>
                    
                    {/* Rich Text Editor */}
                    <textarea
                      ref={textareaRef}
                      value={formData.content}
                      onChange={(e) => updateFormData({ content: e.target.value })}
                      onPaste={handlePaste}
                      onKeyDown={handleKeyDown}
                      rows={15}
                      className="w-full px-4 py-3 bg-gray-900 text-white focus:outline-none resize-none border-0"
                      placeholder="Write your blog content here using Markdown formatting...

Examples:
**Bold text** or *italic text*
# Large Heading
## Medium Heading  
### Small Heading
- Bullet point
1. Numbered list
> Quote block
`inline code`
[Link text](https://example.com)

You can also paste images directly!"
                      style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">SEO Optimization</h2>
                <div className="flex items-center gap-2">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${
                    seoAnalysis.score >= 80 ? 'bg-green-500/20 text-green-400' :
                    seoAnalysis.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {seoAnalysis.score}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => updateFormData({ metaTitle: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="SEO optimized title"
                    maxLength={60}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Optimal: 50-60 characters</p>
                    <p className={`text-xs ${
                      formData.metaTitle.length >= 50 && formData.metaTitle.length <= 60
                        ? 'text-green-400'
                        : formData.metaTitle.length > 60
                        ? 'text-red-400'
                        : 'text-gray-500'
                    }`}>
                      {formData.metaTitle.length}/60
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => updateFormData({ metaDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Brief description for search engines"
                    maxLength={160}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Optimal: 150-160 characters</p>
                    <p className={`text-xs ${
                      formData.metaDescription.length >= 150 && formData.metaDescription.length <= 160
                        ? 'text-green-400'
                        : formData.metaDescription.length > 160
                        ? 'text-red-400'
                        : 'text-gray-500'
                    }`}>
                      {formData.metaDescription.length}/160
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    value={formData.focusKeyword}
                    onChange={(e) => updateFormData({ focusKeyword: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Main keyword for this post"
                  />
                </div>

                {/* SEO Preview */}
                <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-300">Google Search Preview</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-500 text-lg hover:underline cursor-pointer">
                      {formData.metaTitle || formData.title || 'Blog Post Title'}
                    </div>
                    <div className="text-green-600 text-sm">
                      https://yoursite.com/blog/{formData.slug || 'blog-post-slug'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {formData.metaDescription || formData.excerpt || 'Blog post description will appear here...'}
                    </div>
                  </div>
                </div>

                {/* SEO Checklist */}
                <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">SEO Checklist</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.hasTitle ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-600" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.hasTitle ? 'text-gray-300' : 'text-gray-500'}`}>
                        Meta title is set
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.titleLength ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.titleLength ? 'text-gray-300' : 'text-gray-500'}`}>
                        Title length is optimal (50-60 chars)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.hasDescription ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-600" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.hasDescription ? 'text-gray-300' : 'text-gray-500'}`}>
                        Meta description is set
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.descriptionLength ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.descriptionLength ? 'text-gray-300' : 'text-gray-500'}`}>
                        Description length is optimal (150-160 chars)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.hasKeyword ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-600" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.hasKeyword ? 'text-gray-300' : 'text-gray-500'}`}>
                        Focus keyword is set
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.keywordInTitle ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.keywordInTitle ? 'text-gray-300' : 'text-gray-500'}`}>
                        Keyword appears in title
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {seoAnalysis.checks.keywordInDescription ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className={`text-sm ${seoAnalysis.checks.keywordInDescription ? 'text-gray-300' : 'text-gray-500'}`}>
                        Keyword appears in description
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Publishing */}
          <div className="space-y-6">
            {/* Publishing Status */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Publishing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateFormData({ status: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {formData.status === 'scheduled' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={formData.publishDate}
                        onChange={(e) => updateFormData({ publishDate: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Publish Time
                      </label>
                      <input
                        type="time"
                        value={formData.publishTime}
                        onChange={(e) => updateFormData({ publishTime: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-400">
                        Will be published on {new Date(formData.publishDate + 'T' + formData.publishTime).toLocaleString()}
                      </p>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleSave('draft')}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save as Draft'}
                  </button>

                  {formData.status === 'scheduled' ? (
                    <button
                      onClick={() => handleSave('scheduled')}
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Calendar className="w-4 h-4" />
                      {isSaving ? 'Scheduling...' : 'Schedule Post'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSave('published')}
                      disabled={isSaving}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {isSaving ? 'Publishing...' : 'Publish Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Score Summary */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3">SEO Score</h3>
              <div className="flex items-center justify-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl ${
                  seoAnalysis.score >= 80 ? 'bg-green-500/20 text-green-400 border-4 border-green-500' :
                  seoAnalysis.score >= 50 ? 'bg-yellow-500/20 text-yellow-400 border-4 border-yellow-500' :
                  'bg-red-500/20 text-red-400 border-4 border-red-500'
                }`}>
                  {seoAnalysis.score}
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-3">
                {seoAnalysis.score >= 80 ? 'Excellent SEO!' :
                 seoAnalysis.score >= 50 ? 'Good, but can improve' :
                 'Needs improvement'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3">Content Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Words</span>
                  <span className="text-white font-medium">
                    {formData.content.split(' ').filter(w => w).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Characters</span>
                  <span className="text-white font-medium">
                    {formData.content.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reading Time</span>
                  <span className="text-white font-medium">
                    {Math.ceil(formData.content.split(' ').filter(w => w).length / 200)} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
