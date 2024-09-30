import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Share2, Send } from 'lucide-react';

const initialPost = {
  id: 1,
  title: "The Future of Artificial Intelligence",
  description: "Artificial Intelligence is rapidly evolving, transforming industries and our daily lives. From self-driving cars to advanced medical diagnostics, AI is pushing the boundaries of what's possible. But with great power comes great responsibility. As we continue to develop more sophisticated AI systems, we must also grapple with ethical considerations and potential societal impacts. What are your thoughts on the future of AI? How can we ensure it benefits humanity as a whole?",
  author: "TechEnthusiast",
  avatar: "/placeholder.svg?height=50&width=50",
  likes: 1024,
  comments: [
    {
      id: 1,
      author: "AIResearcher",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Great post! I think one of the key challenges we face is ensuring AI systems are transparent and explainable, especially in critical applications like healthcare and criminal justice.",
      createdAt: "2023-08-15T14:30:00Z"
    },
    {
      id: 2,
      author: "EthicsExpert",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Absolutely agree. We need to have robust ethical guidelines and regulations in place as AI becomes more prevalent in our society.",
      createdAt: "2023-08-15T15:45:00Z"
    }
  ],
  createdAt: "2023-08-15T10:00:00Z"
};

export default function SocialPostPage() {
  const [post, setPost] = useState(initialPost);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setPost(prevPost => ({
      ...prevPost,
      likes: prevPost.likes + 1
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
        createdAt: new Date().toISOString()
      };
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, newCommentObj]
      }));
      setNewComment('');
    }
  };

  return (
    <div className="container p-4 max-w-6xl">
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
