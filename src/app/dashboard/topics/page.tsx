import { actionGetTopics } from "@/app/dashboard/topics/actions";
import { DialogAddTopic } from "@/app/dashboard/topics/components/add-topic";
import { ButtonDeleteTopic } from "@/app/dashboard/topics/components/button";
import { Heading } from "@/components/heading";
import { Slug } from "@/components/slug";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { formatDate } from "@/utils/date";
import type { Metadata } from "next";

const TITLE = "Topics";

export const metadata: Metadata = {
  title: TITLE,
};

export default async function Topics() {
  const data = await actionGetTopics();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>{TITLE}</Heading>
        <DialogAddTopic />
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Slug</TableHeader>
            <TableHeader>Description</TableHeader>
            {/* <TableHeader>Created at</TableHeader>
            <TableHeader>Updated at</TableHeader> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((topic) => (
            <TableRow
              key={topic.slug}
              href={`/dashboard/topics/${topic.id}`}
              title={`Topic #${topic.title}`}
            >
              <TableCell>
                <div className="max-w-xs text-wrap line-clamp-2">
                  {topic.title}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs text-wrap line-clamp-2 break-all">
                  <Slug href={`/dashboard/topics/${topic.id}`}>
                    {topic.slug}
                  </Slug>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs text-wrap line-clamp-2">
                  {topic.description}
                </div>
              </TableCell>
              {/* <TableCell>{formatDate(topic.createdAt)}</TableCell>
              <TableCell>{formatDate(topic.updatedAt)}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
