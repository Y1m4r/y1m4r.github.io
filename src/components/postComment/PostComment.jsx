import { useTranslation } from "react-i18next";
import styles from "./PostComment.module.css";
import { LinkIcon, Pin } from "lucide-react";

const PostComment = ({
  avatar,
  username,
  comment,
  date, // ejemplo: "4 Feb 2023"
  pinned = false,
  link,
}) => {
  const { t } = useTranslation("contact");
  return (
    <div className={styles.guestbook}>
      {pinned && (
        <div className={styles.pin}>
          <Pin size={14} />
          <span>{t("guestbook.pinned")}</span>
        </div>
      )}
      <div className={styles.content}>
        <img src={avatar} alt={username} className={styles.avatar} />
        <div>
          <div className={styles.header}>
            <a
              className={styles.userName}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>{username}</strong>
            </a>
            <span className={styles.date}>•</span>
            <span className={styles.date}>{date}</span>
          </div>
          <p className={styles.comment}>{comment}</p>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkIcon}
      >
        <LinkIcon size={18} />
      </a>
    </div>
  );
};

export default PostComment;
