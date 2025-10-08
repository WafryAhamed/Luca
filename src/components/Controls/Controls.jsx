import styles from './Controls.module.css';
export function Controls() {
  return (


      <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea  className={styles.TextArea}  placeholder="Talk with Luca" />
      </div>
       <button className={styles.Button}>
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
        <path d="M120-120v-720l720 360-720 360Z" />

    </svg>
  );
}


export default Controls;