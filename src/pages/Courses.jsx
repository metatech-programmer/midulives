import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { COURSES } from "@constants/courses";



const Courses = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 animate-fade-in">
      <h1 className="text-xl font-bold my-10 font-silkscreen">{t('courses.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <Link to={`/cursos/${course.id}`} key={course.id} className="">
            <div className="bg-gray-900 h-62 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border animate-fade-in-show " style={{ borderColor: course.color }}>
              <div className="w-full h-1/2 p-4 flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center overflow-auto" style={{filter: `drop-shadow(0 0 3px ${course.color})`}}>
                  {course.svg}
                </div>
                <div></div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold" style={{ color: course.color }}>
                  {t(`courses.${course.id}.title`)}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {t(`courses.${course.id}.description`)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
