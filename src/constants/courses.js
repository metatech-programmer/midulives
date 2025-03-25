import ActualizadosSVG from '../components/courses/actualizados';
import AngularSVG from '../components/courses/angular';
import AstroSVG from '../components/courses/astro';
import AwsSVG from '../components/courses/aws';
import BootcampSVG from '../components/courses/bootcamp';
import CloudfareSVG from '../components/courses/cloudfare';
import GitSVG from '../components/courses/git';
import HtmlSVG from '../components/courses/html';
import JavaScriptSVG from '../components/courses/javascript';
import NextjsSVG from '../components/courses/nextjs';
import NodejsSVG from '../components/courses/nodejs';
import PhpSVG from '../components/courses/php';
import PortfoliosSVG from '../components/courses/portfolios';
import PythonSVG from '../components/courses/python';
import ReactSVG from '../components/courses/react';
import SqlSVG from '../components/courses/sql';
import StrapiSVG from '../components/courses/strapi';
import SvelteSVG from '../components/courses/svelte';
import TailwindSVG from '../components/courses/tailwind';
import TddSVG from '../components/courses/tdd';
import TypeScriptSVG from '../components/courses/typescript';
import WordpressHeadlessSVG from '../components/courses/wordpress-headless';
import React from 'react';

export const COURSES = [
  {
    id: "actualizados",
    title: "Cursos Actualizados",
    description: "Mantente al día con los cursos más recientes y actualizados.",
    color: "#00FF00",
    svg: React.createElement(ActualizadosSVG, {className:"w-full h-full"} ),
  },
  {
    id: "angular",
    title: "Curso de Angular",
    description: "Aprende Angular, el framework de Google para crear aplicaciones web.",
    color: "#DD0031",
    svg: React.createElement(AngularSVG, {className:"w-full h-full"} ),
  },
  {
    id: "astro",
    title: "Curso de Astro",
    description: "Aprende Astro, el framework moderno para la creación de sitios estáticos.",
    color: "#FF5A5F",
    svg: React.createElement(AstroSVG, {className:"h-full"} ),
  },
  {
    id: "aws",
    title: "Curso de AWS",
    description: "Aprende Amazon Web Services, la plataforma de servicios en la nube líder.",
    color: "#FF9900",
    svg: React.createElement(AwsSVG, {className:"h-full"} ),
  },
  {
    id: "bootcamp",
    title: "Bootcamp de Programación",
    description: "Formación intensiva en desarrollo web full-stack.",
    color: "#0099FF",
    svg: React.createElement(BootcampSVG, {className:"h-full"} ),
  },
  {
    id: "cloudfare",
    title: "Curso de Cloudflare",
    description: "Aprende a utilizar los servicios de Cloudflare para mejorar tu infraestructura web.",
    color: "#F48120",
    svg: React.createElement(CloudfareSVG, {className:"h-full"} ),
  },
  {
    id: "git",
    title: "Curso de Git",
    description: "Domina el control de versiones con Git.",
    color: "#F05032",
    svg: React.createElement(GitSVG, {className:"h-full"} ),
  },
  {
    id: "html",
    title: "Curso de HTML",
    description: "Aprende HTML, el lenguaje fundamental de la web.",
    color: "#E34F26",
    svg: React.createElement(HtmlSVG, {className:"h-full"} ),
  },
  {
    id: "javascript",
    title: "Curso de JavaScript",
    description: "Domina JavaScript, el lenguaje de programación esencial para el desarrollo web.",
    color: "#F7DF1E",
    svg: React.createElement(JavaScriptSVG, {className:"h-full"} ),
  },
  {
    id: "nextjs",
    title: "Curso de Next.js",
    description: "Aprende Next.js, el framework de React para la producción de sitios web y aplicaciones.",
    color: "#fff",
    svg: React.createElement(NextjsSVG, {className:"h-full"} ),
  },
  {
    id: "nodejs",
    title: "Curso de Node.js",
    description: "Domina Node.js, el entorno de ejecución para JavaScript en el lado del servidor.",
    color: "#68A063",
    svg: React.createElement(NodejsSVG, {className:"h-full"} ),
  },
  {
    id: "php",
    title: "Curso de PHP",
    description: "Aprende PHP, el lenguaje de programación para el desarrollo web del lado del servidor.",
    color: "#8892BF",
    svg: React.createElement(PhpSVG, {className:"h-full"} ),
  },
  {
    id: "portfolios",
    title: "Curso de Portfolios",
    description: "Aprende a crear portfolios impresionantes para mostrar tus habilidades.",
    color: "#FFA500",
    svg: React.createElement(PortfoliosSVG, {className:"w-full h-full"} ),
  },
  {
    id: "python",
    title: "Curso de Python",
    description: "Aprende Python desde cero y conviértete en un experto en este lenguaje de programación.",
    color: "#3776AB",
    svg: React.createElement(PythonSVG, {className:"h-full"} ),
  },
  {
    id: "react",

    title: "Curso de React",
    description: "Aprende a construir aplicaciones con React, una de las bibliotecas de JavaScript más populares.",
    color: "#61DAFB",
    svg: React.createElement(ReactSVG, {className:"h-full"} ),
  },
  {
    id: "sql",
    title: "Curso de SQL",
    description: "Aprende SQL para gestionar y consultar bases de datos.",
    color: "#336791",
    svg: React.createElement(SqlSVG, {className:"h-full"} ),
  },
  {
    id: "strapi",
    title: "Curso de Strapi",
    description: "Aprende a crear APIs con Strapi, el CMS headless líder.",
    color: "#2F2E8B",
    svg: React.createElement(StrapiSVG, {className:"h-full"} ),
  },
  {
    id: "svelte",
    title: "Curso de Svelte",
    description: "Aprende Svelte, el framework moderno para construir interfaces de usuario.",
    color: "#FF3E00",
    svg: React.createElement(SvelteSVG, {className:"h-full"} ),
  },
  {
    id: "tailwind",
    title: "Curso de Tailwind CSS",
    description: "Aprende Tailwind, el framework CSS utility-first.",
    color: "#06B6D4",
    svg: React.createElement(TailwindSVG, {className:"h-full"} ),
  },
  {
    id: "tdd",
    title: "Curso de TDD",
    description: "Aprende Desarrollo Guiado por Pruebas (Test-Driven Development).",
    color: "#009688",
    svg: React.createElement(TddSVG, {className:"h-full"} ),
  },
  {
    id: "typescript",
    title: "Curso de TypeScript",
    description: "Domina TypeScript, un superconjunto de JavaScript que aporta tipado estático.",
    color: "#3178C6",
    svg: React.createElement(TypeScriptSVG, {className:"h-full"} ),
  },
  {
    id: "wordpress_headless",
    title: "Curso de WordPress Headless",
    description: "Aprende a utilizar WordPress como CMS headless.",
    color: "#21759B",
    svg: React.createElement(WordpressHeadlessSVG, {className:"h-full"} ),
  }
];

