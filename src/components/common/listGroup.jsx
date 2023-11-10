import React from 'react'

const ListGroup = (props) => {
    const { items, selectedItem, onItemSelect } = props
    return ( 
        <ul className="list-group">
            {items.map(
                (item) => 
                    <li 
                        key={item[props.textProperty]} 
                        onClick={() => onItemSelect(item)} 
                        className={selectedItem === item ? "list-group-item active" : "list-group-item" }
                    >
                        {item[props.textProperty]}
                    </li>
                )
            }
        </ul> 
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    keyProperty: '_id'
}
 
export default ListGroup;