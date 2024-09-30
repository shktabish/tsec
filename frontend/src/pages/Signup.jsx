import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import api from "@/utils/axios";
import { toast } from "sonner";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [subjects, setSubjects] = useState(""); // Input field for subjects
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("avatar", image);
    formData.append("subjects", subjects.split(",").map((subject) => subject.trim())); // Convert subjects to an array

    try {
      const response = await api.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Registration successful:", response.data);
      toast.success("Registered successfully");
      if(response.data.user.role === "student") {
        navigate("/student/onboarding");
      } else {
        navigate("/mentor/onboarding");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to sign up
            </p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  className="border rounded px-3 py-2"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" hidden className="text-gray-500">
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Profile Image</Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="border rounded px-3 py-2"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subjects">Subjects (comma separated)</Label>
                <Input
                  id="subjects"
                  type="text"
                  placeholder="DSA, OS"
                  required
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an Account?{" "}
            <Link to="/signup" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
