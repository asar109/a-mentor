"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updatedData: { id: string; position: string }[]) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) => {


    const [isMounted , setIsMounted] = useState<boolean>(false);
    const [chapters , setChapters] = useState<Chapter[]>(items);





    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }
    , [items]);



    if (!isMounted) return null;

  return (
    <>
      <p>Items</p>
    </>
  );
};
