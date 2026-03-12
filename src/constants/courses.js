import AngularSVG from '@components/courses/angular';
import AstroSVG from '@components/courses/astro';
import AwsSVG from '@components/courses/aws';
import BootcampSVG from '@components/courses/bootcamp';
import CloudfareSVG from '@components/courses/cloudfare';
import GitSVG from '@components/courses/git';
import HtmlSVG from '@components/courses/html';
import JavaScriptSVG from '@components/courses/javascript';
import NextjsSVG from '@components/courses/nextjs';
import NodejsSVG from '@components/courses/nodejs';
import PhpSVG from '@components/courses/php';
import PortfoliosSVG from '@components/courses/portfolios';
import PythonSVG from '@components/courses/python';
import ReactSVG from '@components/courses/react';
import SqlSVG from '@components/courses/sql';
import StrapiSVG from '@components/courses/strapi';
import SvelteSVG from '@components/courses/svelte';
import TailwindSVG from '@components/courses/tailwind';
import TddSVG from '@components/courses/tdd';
import TypeScriptSVG from '@components/courses/typescript';
import WordpressHeadlessSVG from '@components/courses/wordpress-headless';
import React from 'react';
import CloneSVG from '@components/courses/clone';
import CssSVG from '@components/courses/css';
import FigmaSVG from '@components/courses/figma';
import ReactNativeSVG from '@components/courses/react-native';
import ReactRouterSVG from '@components/courses/react-router';
import McpSVG from '../components/courses/mcp';

// Inline SVGs for courses without dedicated component files
const PruebasTecnicasSVG = ({ className }) =>
  React.createElement('svg', {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    xmlns: "http://www.w3.org/2000/svg",
  },
    React.createElement('path', { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
  );

const RustSVG = ({ className }) =>
  React.createElement('svg', {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
  },
    React.createElement('path', {
      d: "M12 1.5a.75.75 0 01.75.75v.5h.5a.75.75 0 010 1.5h-.5V5a.75.75 0 01-1.5 0v-.75h-.5a.75.75 0 010-1.5h.5v-.5A.75.75 0 0112 1.5zM3 12a9 9 0 1018 0A9 9 0 003 12zm9-7a7 7 0 110 14A7 7 0 0112 5zm-1 3v4l3 3 1.06-1.06-2.56-2.56V8H11z"
    })
  );

// Topics for auto-detected courses that don't have a dedicated playlist.
// Courses.jsx scans API data for these and shows dynamic cards.
// CoursePage.jsx uses keywords to filter matching videos.
export const AUTO_DETECT_TOPICS = [
  { id: "docker", label: "Docker", color: "#0db7ed", keywords: ["docker"] },
  { id: "vue", label: "Vue.js", color: "#42B883", keywords: ["vue.js", "vuejs", "vue 3", "vue js"] },
  { id: "firebase", label: "Firebase", color: "#FFCA28", keywords: ["firebase"] },
  { id: "supabase", label: "Supabase", color: "#3ECF8E", keywords: ["supabase"] },
  { id: "deno", label: "Deno", color: "#F6DECE", keywords: ["deno ", "deno."] },
  { id: "bun", label: "Bun", color: "#fbf0df", keywords: [" bun ", "bun.sh"] },
  { id: "golang", label: "Go / Golang", color: "#00ADD8", keywords: ["golang", "go lang"] },
  { id: "linux", label: "Linux", color: "#FCC624", keywords: ["linux"] },
  { id: "nestjs", label: "NestJS", color: "#E0234E", keywords: ["nestjs", "nest.js"] },
  { id: "remix", label: "Remix", color: "#ffffff", keywords: ["remix"] },
  { id: "htmx", label: "HTMX", color: "#3465a4", keywords: ["htmx"] },
  { id: "solidjs", label: "SolidJS", color: "#2C4F7C", keywords: ["solidjs", "solid.js"] },
  { id: "qwik", label: "Qwik", color: "#AC7EF4", keywords: ["qwik"] },
  { id: "ia", label: "IA / ChatGPT", color: "#10a37f", keywords: ["inteligencia artificial", "chatgpt", "openai", "llm ", " ia ", "gpt-"] },
  { id: "rust", label: "Rust", color: "#CE422B", keywords: ["rust ", "rust:", "rust,"] },
  { id: "kotlin", label: "Kotlin", color: "#7F52FF", keywords: ["kotlin"] },
  { id: "bash", label: "Bash / Terminal", color: "#4EAA25", keywords: ["bash ", "terminal linux", "command line"] },
  { id: "web3", label: "Web3 / Blockchain", color: "#F7931A", keywords: ["web3", "blockchain", "solidity", "ethereum"] },
  { id: "redis", label: "Redis", color: "#DC382D", keywords: ["redis"] },
  { id: "graphql", label: "GraphQL", color: "#E10098", keywords: ["graphql"] },
  { id: "kubernetes", label: "Kubernetes", color: "#326CE5", keywords: ["kubernetes", "k8s"] },
  { id: "turborepo", label: "Turborepo / Monorepo", color: "#EF4444", keywords: ["turborepo", "monorepo", "nx "] },
];

export const COURSES = [
  {
    id: "angular",
    color: "#DD0031",
    svg: React.createElement(AngularSVG, { className: "w-full h-full" }),
  },
  {
    id: "astro",
    color: "#FF5A5F",
    svg: React.createElement(AstroSVG, { className: "h-full" }),
  },
  {
    id: "aws",
    color: "#FF9900",
    svg: React.createElement(AwsSVG, { className: "h-full" }),
  },
  {
    id: "bootcamp",
    color: "#0099FF",
    svg: React.createElement(BootcampSVG, { className: "h-full" }),
  },
  {
    id: "clones_de_midudev",
    color: "#CDCDCD",
    svg: React.createElement(CloneSVG, { className: "w-full h-full" }),
  },
  {
    id: "cloudfare",
    color: "#F48120",
    svg: React.createElement(CloudfareSVG, { className: "h-full" }),
  },
  {
    id: "css",
    color: "#663399",
    svg: React.createElement(CssSVG, { className: "h-full" }),
  },
  {
    id: "figma",
    color: "#F24E1E",
    svg: React.createElement(FigmaSVG, { className: "h-full" }),
  },
  {
    id: "git",
    color: "#F05032",
    svg: React.createElement(GitSVG, { className: "h-full" }),
  },
  {
    id: "html",
    color: "#E34F26",
    svg: React.createElement(HtmlSVG, { className: "h-full" }),
  },
  {
    id: "javascript",
    color: "#F7DF1E",
    svg: React.createElement(JavaScriptSVG, { className: "h-full" }),
  },
  {
    id: "mcp",
    color: "#ffa168",
    svg: React.createElement(McpSVG, { className: "h-full" }),
  },
  {
    id: "nextjs",
    color: "#fff",
    svg: React.createElement(NextjsSVG, { className: "h-full" }),
  },
  {
    id: "nodejs",
    color: "#68A063",
    svg: React.createElement(NodejsSVG, { className: "h-full" }),
  },
  {
    id: "php",
    color: "#8892BF",
    svg: React.createElement(PhpSVG, { className: "h-full" }),
  },
  {
    id: "portfolios",
    color: "#FFA500",
    svg: React.createElement(PortfoliosSVG, { className: "w-full h-full" }),
  },
  {
    id: "python",
    color: "#3776AB",
    svg: React.createElement(PythonSVG, { className: "h-full" }),
  },
  {
    id: "react_native",
    color: "#61DBFB",
    svg: React.createElement(ReactNativeSVG, { className: "h-full" }),
  },
  {
    id: "react_router",
    color: "#61DAFB",
    svg: React.createElement(ReactRouterSVG, { className: "h-full" }),
  },{
    id: "react",
    color: "#61DAFB",
    svg: React.createElement(ReactSVG, { className: "h-full" }),
  },
  {
    id: "sql",
    color: "#336791",
    svg: React.createElement(SqlSVG, { className: "h-full" }),
  },
  {
    id: "strapi",
    color: "#2F2E8B",
    svg: React.createElement(StrapiSVG, { className: "h-full" }),
  },
  {
    id: "svelte",
    color: "#FF3E00",
    svg: React.createElement(SvelteSVG, { className: "h-full" }),
  },
  {
    id: "tailwind",
    color: "#06B6D4",
    svg: React.createElement(TailwindSVG, { className: "h-full" }),
  },
  {
    id: "tdd",
    color: "#009688",
    svg: React.createElement(TddSVG, { className: "h-full" }),
  },
  {
    id: "typescript",
    color: "#3178C6",
    svg: React.createElement(TypeScriptSVG, { className: "h-full" }),
  },
  {
    id: "wordpress_headless",
    color: "#21759B",
    svg: React.createElement(WordpressHeadlessSVG, { className: "h-full" }),
  },
  {
    id: "pruebas_tecnicas",
    color: "#00BCD4",
    svg: React.createElement(PruebasTecnicasSVG, { className: "w-full h-full" }),
  },
  {
    id: "rust",
    color: "#CE422B",
    svg: React.createElement(RustSVG, { className: "w-full h-full" }),
  },
];

