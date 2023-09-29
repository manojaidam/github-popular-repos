import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, onChangeItem, isActive} = props
  const {id, language} = filterItem

  const languageElement = isActive ? 'active-list-item' : ''

  const onchangeLanguageItem = () => {
    onChangeItem(id)
  }

  return (
    <button
      type="button"
      className="button-item"
      onClick={onchangeLanguageItem}
    >
      <li className={`languages-list-item-container ${languageElement}`}>
        {language}
      </li>
    </button>
  )
}

export default LanguageFilterItem
