import ActualizadosSVG from '@components/courses/actualizados';
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

export const COURSES = [
  {
    id: "actualizados",
    color: "#00FF00",
    svg: React.createElement(ActualizadosSVG, { className: "w-full h-full" }),
  },
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
  }
];

