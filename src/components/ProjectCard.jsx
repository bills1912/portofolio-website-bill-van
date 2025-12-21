/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import PropTypes from 'prop-types';


const ProjectCard = ({
  imgSrc,
  title,
  desc,
  tags,
  projectLink,
  classes
}) => {
  return (
    <div className={"relative p-4 rounded-2xl bg-zinc-800 dark:bg-zinc-800 light:bg-white light:shadow-md light:border light:border-zinc-200 hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 light:hover:bg-zinc-50 active:bg-zinc-700/60 dark:active:bg-zinc-700/60 light:active:bg-zinc-100 ring-1 ring-inset ring-zinc-50/5 dark:ring-zinc-50/5 light:ring-zinc-200 transition-colors " + classes}>

      <figure className="img-box aspect-square rounded-lg mb-4">
        <img
          src={imgSrc}
          alt={title}
          loading='lazy'
          className="img-cover"
        />
      </figure>

      <div className="flex items-center justify-between gap-4">

        <div>
          <h3 className="title-1 mb-3 text-zinc-100 dark:text-zinc-100 light:text-zinc-800">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-sm">
              {desc}
            </p>
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 text-sm text-zinc-400 dark:text-zinc-400 light:text-zinc-600 bg-zinc-50/5 dark:bg-zinc-50/5 light:bg-zinc-100 grid items-center px-3 rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {projectLink !== '' && (
          <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
            <span
              className="material-symbols-rounded"
              aria-hidden="true"
            >
              arrow_outward
            </span>
            <a
              href={projectLink}
              target='_blank'
              className="absolute inset-0"
            >
            </a>
          </div>
        )}

      </div>


    </div>
  )
}

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  desc: PropTypes.string.isRequired,
  projectLink: PropTypes.string,
  classes: PropTypes.string
}

export default ProjectCard