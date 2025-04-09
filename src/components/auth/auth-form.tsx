
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "organizer"], { 
    required_error: "Please select a role" 
  }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }).max(15),
  role: z.enum(["admin", "organizer"], { 
    required_error: "Please select a role" 
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = mode === "login" ? loginSchema : registerSchema;
  
  const form = useForm<LoginFormValues | RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === "login" 
      ? {
          email: "",
          password: "",
          role: "organizer",
        }
      : {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "organizer",
        }
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // Mock authentication - in a real app, this would call your auth service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form values:", values);
      
      // Simulate successful login/registration
      if (mode === "login") {
        const loginValues = values as LoginFormValues;
        toast.success("Login successful", {
          description: `Welcome back, ${loginValues.role === "admin" ? "Admin" : "Organizer"}!`,
        });
        
        // Redirect based on role
        navigate("/dashboard");
      } else {
        toast.success("Registration successful", {
          description: "Your account has been created.",
        });
        
        // Redirect to login
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error(mode === "login" ? "Login failed" : "Registration failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-lg bg-background/50 border">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Login" : "Create an account"}</CardTitle>
        <CardDescription>
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Fill out the form below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === "login" && (
              <Tabs defaultValue="organizer" className="w-full mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="organizer" 
                    onClick={() => form.setValue("role", "organizer")}
                  >
                    Organizer
                  </TabsTrigger>
                  <TabsTrigger 
                    value="admin" 
                    onClick={() => form.setValue("role", "admin")}
                  >
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            
            {mode === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Enter your password" 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">Toggle password visibility</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {mode === "register" && (
              <>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Confirm your password" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <EyeIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="sr-only">Toggle password visibility</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin" />
                            <Label htmlFor="admin">Admin</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="organizer" id="organizer" />
                            <Label htmlFor="organizer">Organizer</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {mode === "login" && (
              <div className="text-sm text-right">
                <Button variant="link" className="p-0 h-auto text-xs" onClick={() => toast.info("Enter your email to receive a reset link", { description: "Feature coming soon!" })}>
                  Forgot password?
                </Button>
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "login" ? "Logging in..." : "Creating account..."}
                </>
              ) : (
                <>{mode === "login" ? "Login" : "Create account"}</>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Button 
                variant="link" 
                className="h-auto p-0 text-primary" 
                onClick={() => navigate("/auth/register")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="h-auto p-0 text-primary" 
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}
