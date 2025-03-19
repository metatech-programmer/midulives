const Courses = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aquí puedes mapear y renderizar tus cursos */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">Curso de React</h2>
          <p className="text-gray-600 mt-2">
            Aprende a construir aplicaciones con React, una de las bibliotecas
            de JavaScript más populares.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">Curso de JavaScript</h2>
          <p className="text-gray-600 mt-2">
            Domina JavaScript, el lenguaje de programación esencial para el
            desarrollo web.
          </p>
        </div>
        {/* Agrega más cursos aquí */}
      </div>
    </div>
  );
};

export default Courses;

