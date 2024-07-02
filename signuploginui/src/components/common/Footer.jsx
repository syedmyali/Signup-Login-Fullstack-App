export default function Footer() {
  return (
    <div className="container-fluid my-5">
      <footer className="text-center bg-dark p-3 fixed-bottom">
        <span className="text-light">
          Syed Ali | All Right Reserved &copy; {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
