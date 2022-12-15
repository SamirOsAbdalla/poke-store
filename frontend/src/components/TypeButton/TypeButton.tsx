import "./TypeButton.css"

import React from 'react'

interface PropType {
  type: string
}

enum TypeColor {
  grass = "#3b7f29",
  poison = "#50214f",
  dark = "#3e2d23",
  ghost = "#5c5bac",
  ice = "#6ad4f3",
  water = "#0c69c4",
  steel = "#908e9f",
  rock = "#9e863e",
  normal = "#c1bcb3",
  ground = "#caad56",
  flying = "#8da2ec",
  fire = "#c72000",
  fighting = "#78331d",
  fairy = "#e9a5e9",
  electric = "#e79306",
  dragon = "#6f5bd9",
  bug = "#88970d",
}

export const TypeButton = (props: PropType) => {


  return (
    <div>
      <button style={{ background: TypeColor[props.type as keyof typeof TypeColor] }} className="type__button">
        {props.type.toUpperCase()}
      </button>
    </div>
  )
}
