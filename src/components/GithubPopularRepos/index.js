import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    activeItemStatus: apiStatusConstraints.initial,
    languagesDetails: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({activeItemStatus: apiStatusConstraints.inprogress})

    const {activeId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const formatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        issuesCount: each.issues_count,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        startsCount: each.stars_count,
      }))
      this.setState({
        languagesDetails: formatedData,
        activeItemStatus: apiStatusConstraints.success,
      })
    } else if (response.status === 401) {
      this.setState({activeItemStatus: apiStatusConstraints.failure})
    }
  }

  onChangeItem = id => {
    const activeValue = languageFiltersData.find(each => each.id === id)
    if (activeValue) {
      this.setState({activeId: activeValue.id}, this.getProducts)
    }
  }

  renderRepositoryItem = () => {
    const {languagesDetails} = this.state
    return (
      <ul className="repository-container">
        {languagesDetails.map(eachItem => (
          <RepositoryItem eachCardItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view-image"
        alt="failure view"
      />
      <p className="failure-view-para">Something Went Wrong</p>
    </div>
  )

  renderIsLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResultView = () => {
    const {activeItemStatus} = this.state
    switch (activeItemStatus) {
      case apiStatusConstraints.success:
        return this.renderRepositoryItem()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inprogress:
        return this.renderIsLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="github-container">
        <h1 className="github-heading">Popular</h1>
        <ul className="github-language-header-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              filterItem={eachItem}
              key={eachItem.id}
              onChangeItem={this.onChangeItem}
              isActive={activeId === eachItem.id}
            />
          ))}
        </ul>
        {this.renderResultView()}
      </div>
    )
  }
}

export default GithubPopularRepos
