import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nexlify Tech`,
    description: project.desc,
  };
}

export default function WorkDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
