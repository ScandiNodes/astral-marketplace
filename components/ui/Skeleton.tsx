"use client";

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  const radius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return <div className={`skeleton ${radius[rounded]} ${className}`} />;
}

export function NFTCardSkeleton() {
  return (
    <div className="glass rounded-lg overflow-hidden">
      <Skeleton className="aspect-nft w-full" rounded="sm" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="glass rounded-lg overflow-hidden">
      <Skeleton className="h-32 w-full" rounded="sm" />
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10" rounded="full" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
