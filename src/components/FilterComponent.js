import React from 'react'
import { ClearButton, TextField } from '@/components/Styled'

const  FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        
        <TextField
            id="search"
            type="text"
            placeholder="Votre recherche"
            aria-label="Recherche"
            className="bg-gray-50"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
            
    </>
)

export default FilterComponent