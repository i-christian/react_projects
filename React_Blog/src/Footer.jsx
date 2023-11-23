const Footer = () => {
    const today = new Date();
    return(
        <footer className="w-full bg-slate-900 ml-0 scroll-m-8 p-4 text-center text-xl">
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer;