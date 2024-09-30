import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Share2, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ForumPost() {
  // Get the post data passed via location state or use initialPost for development
  const location = useLocation();
  const postData = location.state?.post || initialPost;

  // Use state to manage the post data and comments
  const [post, setPost] = useState(postData);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setPost((prevPost) => ({
      ...prevPost,
      likes: prevPost.likes + 1,
    }));
  };

  const handleShare = () => {
    alert("Sharing functionality would be implemented here!");
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        id: post.comments.length + 1,
        author: "CurrentUser",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newCommentObj],
      }));
      setNewComment('');
    }
  };

  return (
    <div className="container p-4 max-w-6xl">
      {/* Post Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.author}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-4">{post.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-4">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <ThumbsUp className="h-5 w-5 mr-2" />
            {post.likes} Likes
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="flex space-x-2 mb-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleAddComment}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Post comment</span>
          </Button>
        </div>
        {/* Render Comments */}
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
