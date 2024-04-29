import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';


const Single = () => {
  return (
    <section className="single">
      <section className="content">
        <img src="" alt=""/>
        <section className="user">
          <img src="" alt="" />
          <section className="info">
            <span>John</span>
            <p>Posted 2 days ago </p>
          </section>
          <section className='edit'>
            <Link to={`write?edit=2`}>
              <img src={Edit} alt='' />
            </Link>
            <img src={Delete} alt=''/>
          </section>
        </section>
        <h1>DLdpgfpdg[pkg[pgmgaomrm]] jejetgg </h1>
        <p> Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        </p>
      </section>
      <section className="menu">
       <Menu/>
      </section>
    </section>
  )
}

export default Single
