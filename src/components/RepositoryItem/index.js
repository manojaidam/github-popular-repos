import './index.css'

const RepositoryItem = props => {
  const {eachCardItem} = props
  const {name, avatarUrl, forksCount, issuesCount, startsCount} = eachCardItem

  return (
    <li className="card-list-item">
      <img src={avatarUrl} className="card-img" alt={name} />
      <h1 className="image-heading">{name}</h1>
      <div className="heading-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon-img"
          alt="stars"
        />
        <p className="card-para">{`${startsCount} stars`}</p>
      </div>
      <div className="heading-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon-img"
          alt="forks"
        />
        <p className="card-para">{`${forksCount} forks`}</p>
      </div>
      <div className="heading-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon-img"
          alt="open issues"
        />
        <p className="card-para">{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
