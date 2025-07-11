import Image from 'next/image';
import styles from './cover-page.module.css';

interface CoverPageProps {
  intake: any,
  primaryColor: string,
}

function CoverPage(props: CoverPageProps) {
  const { intake, primaryColor } = props;


  const date = new Date((intake?.createdAt)?.toDate()?.toLocaleString());


  // Options for toLocaleDateString to get the desired format
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };

  const formattedDate = date.toLocaleDateString('en-US', opts as any);

  return (
    <div className={styles.page}>
      <div className={styles.header} style={{ backgroundColor: primaryColor }}>
        <h1 className='text-6xl p-12 text-white'>Succession Plan Report</h1>
        <hr className={styles.hr} />
        <h3>{formattedDate}</h3>
      </div>

      <div className={styles.squares_div}>
        <div className={styles.tilted_square} style={{ backgroundColor: primaryColor }}></div>
      </div>



      <div className={styles.subsquares_div}>
        <div className={styles.tilted_subsquare} style={{ backgroundColor: primaryColor }}></div>
      </div>


      <div className={styles['company-info']} style={{ backgroundColor: primaryColor }}>
        <h1 className='text-8xl'>{intake?.companyName}</h1>
      </div>

      <div className={styles.date}>
        <div className={styles.logo}>
          {intake?.logo &&
            <Image
              src={intake?.logo}
              // src={'https://firebasestorage.googleapis.com/v0/b/bizbridge-78490.appspot.com/o/jen-removebg-preview.png?alt=media&token=a24aa988-e553-4ac5-a525-74856853bafe'}
              width={300}
              height={300}
              style={{ width: '100%', height: '100%' }}
              alt="assistant-image"
              className="object-contain "
            />
          }
        </div>
        <h2 className='text-6xl'>{intake?.dba}</h2>
      </div>
    </div>
  )
}

export default CoverPage