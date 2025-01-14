import React from "react";
import styles from "./fileviewer.module.css";

const FileViewer = ({ fileUrl, altText }) => {
    if (!fileUrl) {
        return <div>No file available</div>;
    }

    const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

    return (
        <div className={styles.fileViewerContainer}>
            {isPdf ? (
                <div className={styles.pdfWrapper}>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.overlayLink}
                    >
                        Open PDF
                    </a>
                    <object
                        data={fileUrl}
                        type="application/pdf"
                        className={styles.pdfViewer}
                    >
                        <p>
                            Your browser does not support PDFs. Click{" "}
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                here
                            </a>{" "}
                            to download.
                        </p>
                    </object>
                </div>
            ) : (
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    <img
                        src={fileUrl}
                        alt={altText || "File"}
                        className={styles.image}
                    />
                </a>
            )}
        </div>
    );
};

export default FileViewer;
