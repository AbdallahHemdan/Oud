import React from 'react'
function Subheader({ name }) {
  return (
    <section className="main-content">
      <div className="row"
        data-testid="category-header"
      >
        <div className="sub-header"
          data-testid="category-title"
        >{name}</div>
      </div>
    </section>
  )
}
export default Subheader
