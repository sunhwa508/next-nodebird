import React from 'react'

interface Props {
    children: React.ReactNode;
  }

const AppLayout = ({children}:Props) => {
    return (
        <div>
            <div>공통메뉴</div>
            {children}
        </div>
    )
}

export default AppLayout
