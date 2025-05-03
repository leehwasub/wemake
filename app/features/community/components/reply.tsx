import React, { useState } from 'react';
import { Form, Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '~/common/components/ui/avatar';
import { DotIcon, MessageCircleIcon } from 'lucide-react';
import { Textarea } from '~/common/components/ui/textarea';
import { DateTime } from 'luxon';

interface ReplyProps {
  avatarSrc: string | null;
  userName: string;
  userLink: string;
  timeAgo: string;
  message: string;
  topLevel?: boolean;
  replies?: {
    reply: string;
    created_at: string;
    profiles: {
        name: string;
        avatar: string | null;
        username: string;
    };
  }[];
}

export function Reply({ avatarSrc, userName, userLink, timeAgo, message, topLevel = false, replies }: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying(prev => !prev);
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-2/3">
      <Avatar className="size-14">
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        <AvatarImage src={avatarSrc ?? ""} />
      </Avatar>
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex gap-2 items-center">
          <Link to={userLink}>
            <h4 className="font-medium">{userName}</h4>
          </Link>
          <DotIcon className="size-5" />
          <span className="text-xs text-muted-foreground">
            {DateTime.fromISO(timeAgo).toRelative()}
          </span>
        </div>
        <p className="text-muted-foreground">
          {message}
        </p>
        <Button variant={"ghost"} className="self-end" onClick={toggleReplying}>
          <MessageCircleIcon className="size-4"/>
          Reply
        </Button>
      </div>
    </div>
    {replying && 
      <Form className="flex items-start gap-5 w-3/4">
        <Avatar className="size-14">
          <AvatarFallback>N</AvatarFallback>
          <AvatarImage src="https://github.com/microsoft.png" />
        </Avatar>
        <div className="flex flex-col gap-5 items-end w-full">
          <Textarea 
            placeholder="Write a reply" 
            className="w-full resize-none"
            rows={10} 
          />
          <Button>Reply</Button>
        </div>
    </Form>
    }
    {topLevel && replies && (
      <div className="pl-10 w-full">
        {replies.map((reply) => (
          <Reply 
            avatarSrc={reply.profiles.avatar}
            userName={reply.profiles.name}
            userLink={`/user/@${reply.profiles.username}`}
            timeAgo={reply.created_at}
            message={reply.reply}
            topLevel={false}
          />
        ))}
      </div>
    )}
    </div>
  );
} 