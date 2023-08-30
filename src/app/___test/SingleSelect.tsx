export default function SingleSelect(props: any) {
  const { title, petTypes } = props
  return (
    <div className="home-pet-select-box">
      <label className="home-pet-sel-title">{ title }</label>

      <div className="home-pet-select-content">
        {
          petTypes.map((info: any, index: number) => {
            return (
              <div
                key={index}
                className="home-select-pet-info"
              >
                <div className="home-sel-type-name">
                  { info.kindName }
                </div>
                <div className="home-sel-type-links">
                  <span>详情</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}