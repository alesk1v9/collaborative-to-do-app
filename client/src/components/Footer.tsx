import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="items-center text-lg font-bold">
        <span className="flex justify-center items-center p-4 text-black">
            © {currentYear}
        </span>
    </footer>
  )
}

export default Footer