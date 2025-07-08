import { motion } from "framer-motion";
import styles from "./ToolsBox.module.css";
import IconTool from "../iconTool/IconTool";
import { useTranslation } from "react-i18next";

const tools = [
  "kalilinux",
  "parrotos",
  "burpsuite",
  "caido",
  "zapproxy",
  "metasploit",
  "wireshark",
  "shodan",
  "hackthebox",
  "python",
  "bash",
  "java",
  "go",
  "js",
  "flutter",
  "aws",
  "azure",
  "digitalocean",
  "mysql",
  "wazuh",
  "nessus",
  "cursor",
  "vsCode",
  "git",
  "notion",
  "slack",
];

const ToolsBox = () => {
  const { t } = useTranslation("about");

  return (
    <div className={styles.containerTools}>
      <div className={styles.tools}>
        <h3 className={styles.workTag1}>{t("aboutMe.skills")}</h3>
        <div className={styles.box}>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <IconTool tools={tools} size="small" />
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default ToolsBox;
