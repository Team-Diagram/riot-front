function MyComponent() {
  function handler({ currentTarget }) {
    currentTarget.classList.toggle('MyComponent__button--active')
  }

  return (
    <div className="MyComponent">
      <button className="MyComponent__button" type="button" onClick={handler}>
        <span>Button</span>
      </button>
      <p className="MyComponent__text">Component Text</p>
    </div>
  )
}

export default MyComponent
