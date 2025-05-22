/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */


/**
 * Components
 */
import ProjectCard from "./ProjectCard";


const works = [
  {
    imgSrc: '/portofolio-website-bill-van/images/project-1.png',
    title: 'MPL-PORD',
    tags: ['Object Detection', 'Docker'],
    desc: 'An application to detect the type of palm oil ripeness from photo, video, and streaming.',
    projectLink: ''
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-2.png',
    title: 'Website Desa Cantik',
    tags: ['Spatial Data', 'Data Management'],
    desc: 'A web application to mapping village data for accelerate government program in poverty.',
    projectLink: 'https://desa-cantik.datada1278.com/'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-3.png',
    title: 'Scraping Infrastructure Data for PODES 2025',
    tags: ['Web Scraping', 'Streamlit'],
    desc: 'A web application to scraping and visualize the infrastructure data for PODES 2025.',
    projectLink: 'https://scraping-data-for-podes25.streamlit.app/'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-4.png',
    title: 'Scraping Data for Education',
    tags: ['Web Scraping', 'Education'],
    desc: 'A web application to scraping and visualize the education data for sectoral.',
    projectLink: 'https://education-sentiment-analysis.streamlit.app/?page=Home'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-5.png',
    title: 'API Web Application for Gunungsitoli Municipality Government',
    tags: ['API', 'Government'],
    desc: 'A web API application for communicate data easily.',
    projectLink: ''
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-6.png',
    title: 'PKL STIS Data Management Feature in PPPM Web Application',
    tags: ['Web Applicaton', 'Data'],
    desc: 'A web application to manage the data of students who are doing internship in PPPM.',
    projectLink: 'https://pppm.stis.ac.id/pkl'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-7.png',
    title: 'Testimoni Business in Statistical Service',
    tags: ['Web Application', 'Testimoni'],
    desc: 'A web application to manage testimoni data from business in statistical service.',
    projectLink: 'https://vandataalchemist-testimoni.streamlit.app/'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-8.png',
    title: 'SeeMitra',
    tags: ['Spatial', 'Management'],
    desc: 'A web application to manage BPS collaborator for working in statistical work.',
    projectLink: 'https://seemitra.datada1278.com/'
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-9.png',
    title: 'Land Use Detection using Remote Sensing Dashboard',
    tags: ['Spatial', 'LULC'],
    desc: 'A web application to show the result of land use detection using remote sensing.',
    projectLink: ''
  },
  {
    imgSrc: '/portofolio-website-bill-van/images/project-10.png',
    title: 'Learning Type Activity Clustering with KMeans Dashboard',
    tags: ['Machine Learning', 'Clustering'],
    desc: 'A dashboard to visualize the result of learning activity clustering with KMeans.',
    projectLink: ''
  },
];


const Work = () => {
  return (
    <section
      id="work"
      className="section"
    >
      <div className="container">

        <h2 className="headline-2 mb-8 reveal-up">
          My portfolio highlights
        </h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {works.map(({ imgSrc, title, tags, desc, projectLink }, key) => (
            <ProjectCard
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              desc={desc}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Work