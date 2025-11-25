import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BoneIcon } from './bone-icon';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BoneIcon className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl font-headline">
            BoneCheck AI
          </h1>
        </div>
        <Avatar>
          <AvatarImage src="https://picsum.photos/seed/user/40/40" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
