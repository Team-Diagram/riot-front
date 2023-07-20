function Add({ slug, columns }) {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="add">
      <div className="modal">
        <span>X</span>
        <h1>
          Ajouter
          {slug}
        </h1>
        <form onSubmit={handleSubmit}>
          {
            columns
              .filter((item) => item.field !== 'id' && item.field !== 'img')
              .map((column) => (
                <div key={column.field} className="item">
                  <label htmlFor="text">{column.headerName}</label>
                  <input type={column.type} placeholder={column.field} />
                </div>
              ))
          }
          <button type="button">Ajouter l\'utilisateur</button>
        </form>
      </div>
    </div>
  )
}

export default Add
