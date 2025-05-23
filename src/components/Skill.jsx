/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */


/**
 * Components
 */
import SkillCard from "./SkillCard";


const skillItem = [
  {
    imgSrc: '/portofolio-website-bill-van/images/python.svg',
    label: 'Python',
    desc: 'Data Science and AI'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/spss.svg',
    label: 'SPSS',
    desc: 'Statistical Analysis'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/rstudio.svg',
    label: 'RStudio',
    desc: 'Statistical Processing'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/react.svg',
    label: 'React',
    desc: 'Framework'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/laravel.svg',
    label: 'Laravel',
    desc: 'Framework'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/earthengine.png',
    label: 'Google Earth Engine',
    desc: 'Remote Sensing'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/altair.png',
    label: 'Rapidminer AI Studio',
    desc: 'Data Analytics'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/django.svg',
    label: 'Django',
    desc: 'Python Framework'
  },
];


const Skill = () => {
  return (
    <section className="section">
      <div className="container">

        <h2 className="headline-2 reveal-up">
          Essential Tools I use
        </h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {
            skillItem.map(({ imgSrc, label, desc }, key) => (
              <SkillCard
                key={key}
                imgSrc={imgSrc}
                label={label}
                desc={desc}
                classes="reveal-up"
              />
            ))
          }
        </div>

      </div>
    </section>
  )
}

export default Skill