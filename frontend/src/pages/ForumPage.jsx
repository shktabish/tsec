import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUp, ArrowDown, MessageCircle, Share2 } from "lucide-react";

const initialPosts = [
  {
    id: 1,
    title:
      "TIL that honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    description:
      "I find it fascinating how honey can last for thousands of years without spoiling. It's due to its unique chemical properties that make it inhospitable to bacteria and microorganisms. This discovery in ancient Egyptian tombs really puts into perspective how remarkable this natural substance is!",
    author: "HoneyEnthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    subreddit: "todayilearned",
    votes: 15070,
    comments: [
      {
        id: 1,
        author: "BeeKeeper",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "As a beekeeper, I can confirm this. Honey is amazing!",
        createdAt: "2023-08-15T11:30:00Z",
      },
      {
        id: 2,
        author: "HistoryBuff",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "It's incredible to think about the connection we have to ancient civilizations through things like this.",
        createdAt: "2023-08-15T12:15:00Z",
      },
    ],
    createdAt: "2023-08-15T10:30:00Z",
  },
  {
    id: 2,
    title: "What's a cool science fact that blows your mind every time you think about it?",
    description:
      "I'll start: The fact that we are all made of stardust. Almost every element on Earth was formed at the heart of a star. We are literally made of star stuff. It's both humbling and awe-inspiring to think about our cosmic origins.",
    author: "CosmicWonderer",
    avatar: "/placeholder.svg?height=40&width=40",
    subreddit: "AskReddit",
    votes: 9724,
    comments: [
      {
        id: 1,
        author: "ScienceGeek",
        avatar: "/placeholder.svg?height=40&width=40",
        content:
          "Here's one: If you could fold a piece of paper 42 times, it would reach the moon!",
        createdAt: "2023-08-14T19:30:00Z",
      },
    ],
    createdAt: "2023-08-14T18:45:00Z",
  },
  {
    id: 3,
    title: "I built a web app that visualizes sorting algorithms. What do you think?",
    description:
      "Hey everyone! I've been learning web development and decided to create a project that combines my love for coding and algorithms. It's a web app that visually demonstrates how different sorting algorithms work. You can adjust the speed, number of elements, and choose from bubble sort, quick sort, merge sort, and more. I'd love to get your feedback and suggestions for improvement!",
    author: "AlgoVisualizer",
    avatar: "/placeholder.svg?height=40&width=40",
    subreddit: "webdev",
    votes: 555,
    comments: [],
    createdAt: "2023-08-15T09:15:00Z",
  },
];

export default function RedditLikeForum() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);

  const handleAddPost = () => {
    if (newPostTitle.trim() !== "" && newPostDescription.trim() !== "") {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        description: newPostDescription,
        author: "CurrentUser",
        avatar: "/placeholder.svg?height=40&width=40",
        subreddit: "all",
        votes: 1,
        comments: [],
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle("");
      setNewPostDescription("");
      setIsModalOpen(false);
    }
  };

  const handleVote = (id, isUpvote) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, votes: isUpvote ? post.votes + 1 : post.votes - 1 }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="container p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Reddit-like Forum</h1>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">Create New Post</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              type="text"
              placeholder="Post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Textarea
              placeholder="Post description"
              value={newPostDescription}
              onChange={(e) => setNewPostDescription(e.target.value)}
            />
            <Button onClick={handleAddPost}>Submit Post</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">
                  r/{post.subreddit}
                </span>
                <span className="mx-1">•</span>
                <span>Posted by u/{post.author}</span>
                <span className="mx-1">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.description}</p>
            </CardContent>
            <CardFooter className="px-4 py-2 bg-muted flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(post.id, true)}
                >
                  <ArrowUp className="h-4 w-4 mr-1" />
                </Button>
                <span className="font-bold">{post.votes}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(post.id, false)}
                >
                  <ArrowDown className="h-4 w-4 mr-1" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments.length} Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardFooter>
            {expandedComments.includes(post.id) && (
              <div className="px-4 py-2 space-y-2">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-2 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{comment.author}</div>
                      <p>{comment.content}</p>
                      <span className="text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
