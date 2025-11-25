export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BoneCheck AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
