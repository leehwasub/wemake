import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { BarChart3Icon, BellIcon, LogOutIcon, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";

const menus = [
  {
    name:"Products",
    to:"/products",
    items:[
      {
        name:"Leaderboards",
        description:"See the top performers in your community",
        to:"/products/leaderboards"
      },
      {
        name:"Categories",
        description:"See the top performers in your community",
        to:"/products/categories"
      },
      {
        name:"Search",
        description:"Search for a product",
        to:"/products/search"
      },
      {
        name:"Submit",
        description:"Submit a new product",
        to:"/products/submit"
      },
      {
        name:"Promote",
        description:"Promote your product to the community",
        to:"/products/promote"
      }
    ]
  },
  {
    name:"Jobs",
    to:"/jobs",
    items:[
      {
        name: "Remote Jobs",
        description: "Find remote jobs in your community",
        to: "/jobs/location=remote"
      },
      {
        name:"Full-Time Jobs",
        description:"Find full-time jobs in your community",
        to:"/jobs/type=full-time"
      },
      {
        name:"Freelance Jobs",
        description:"Find freelance jobs in your community",
        to:"/jobs/type=freelance"
      },
      {
        name:"Internships",
        description:"Find internships in your community",
        to:"/jobs/type=internship"
      },
      {
        name:"Submit a Job",
        description:"Submit a new job to the community",
        to:"/jobs/submit"
      }
    ]
  },
  {
    name:"Community",
    to: "/community",
    items:[
      {
        name:"All Posts",
        description:"Discuss the latest trends in your community",
        to:"/community"
      },
      {
        name:"Top Posts",
        description:"See the top posts in your community",
        to:"/community?sort=top"
      },
      {
        name:"New Posts",
        description:"See the latest posts in your community",
        to:"/community?sort=new"
      },
      {
        name:"Create a Post",
        description:"Create a new post to the community",
        to:"/community/create"
      }
    ]
  },
  {
    name: "IdeasGPT",
    to:"/ideas",
  },
  {
    name:"Teams",
    to:"/teams",
    items:[
      {
        name:"All Team",
        description:"Create a new team to the community",
        to:"/teams"
      },
      {
        name:"Create a Team",
        description:"Create a new team to the community",
        to:"/teams/create"
      }
    ]
  }
];

export default function Navigation({isLoggedIn, hasNotifications, hasMessages, username, avatar, name}:{isLoggedIn:boolean, hasNotifications:boolean, hasMessages:boolean, username?:string | null, avatar?:string | null, name?:string | null}) {
  return (
  <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
    <div className="flex items-center">
      <Link to="/" className="font-bold tracking-tighter text-lg">
        WeMake
      </Link>
      <Separator orientation="vertical" className="!h-6 mx-4" />
      <NavigationMenu>
        <NavigationMenuList>
          {menus.map(menu => (
            <NavigationMenuItem key={menu.name}>
              {menu.items ? <>
              <Link to={menu.to} prefetch="render">
                <NavigationMenuTrigger>
                  {menu.name}
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                  {menu.items?.map(item => (
                    <NavigationMenuItem key={item.name} className={cn([
                      "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                      item.to === "/products/promote" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                      item.to === "/jobs/submit" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                    ])}>
                      <NavigationMenuLink asChild>
                        <Link 
                        className="p-3 space-y-1 block leading-none no-underline outline-none"
                        to={item.to}>
                        <span className="text-sm font-medium leading-none">{item.name}</span>
                        <p className="text-sm leading-none text-muted-foreground">
                          {item.description}
                        </p>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </ul>
              </NavigationMenuContent></> : 
              <Link className={navigationMenuTriggerStyle()}  to={menu.to}>{menu.name}</Link>}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    {isLoggedIn ? (
    <div className="flex items-center gap-2">
       <Button size="icon" variant="ghost" asChild className="relative">
        <Link to="/my/notifications">
          <BellIcon className="w-4 h-4" />
          {hasNotifications && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
        </Link>
       </Button>
       <Button size="icon" variant="ghost" asChild className="relative">
        <Link to="/my/messages">
          <MessageCircleIcon className="w-4 h-4" />
          {hasMessages && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
        </Link>
       </Button>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            {avatar ? <AvatarImage src={avatar} className="w-10 h-10" /> : <AvatarFallback className="size-10">{name?.charAt(0)}</AvatarFallback>}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">@{username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/my/dashboard">
              <BarChart3Icon className="w-4 h-4 mr-2" />
              Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/my/profile">
              <UserIcon className="w-4 h-4 mr-2" />
              Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/my/settings">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/auth/logout">
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
              </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    ) : (
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/join">Sign Up</Link>
        </Button>
      </div>
    )}
  </nav>
  )
}
