import React from "react";
import { Collapse } from "antd";
import styles from "./review.module.css";
import FileViewer from "../../utils/FileViewer/FileViewer"; // Adjust the import path if necessary

const { Panel } = Collapse;

const ReviewCollapsePanel = ({
  title,
  data,
  fields,
  isArray = false,
  isImageSection = false,
  defaultActiveKey = "0",
  isImageUrl = false,
  baseUrl = "", // Dynamic base URL
}) => {
  // Filter data only if `isImageSection` and `isArray` are true
  const validData =
    isImageSection && isArray
      ? (Array.isArray(data) ? data : []).filter((item) => item.url && item.url !== "N/A")
      : data;

  // Exclude the section if there is no valid data for images
  if (isImageSection && isArray && (!validData || validData.length === 0)) {
    return null;
  }

  return (
    <div className="mb-4">
      <Collapse
        defaultActiveKey={[defaultActiveKey]}
        expandIconPosition="end"
        className={styles.customCollapse}
      >
        <Panel header={title} key="1" className={styles.panel}>
          <div className={styles.section}>
            {isArray && validData.length > 0 ? (
              validData.map((item, index) => (
                <React.Fragment key={index}>
                  {validData.length > 1 && (
                    <div className={styles.fullLineTitle}>
                      <h4 className={styles.subHeading}>{`${title} ${index + 1}`}</h4>
                    </div>
                  )}
                  {isImageSection ? (
                    <div className={styles.galleryContainer}>
                      {validData.map((image, imageIndex) => (
                        <div className={styles.imageCard} key={imageIndex}>
                          <FileViewer
                            fileUrl={isImageUrl ? `${baseUrl}${image.url}` : image.url}
                            altText={`Uploaded Document ${imageIndex + 1}`}
                            className={styles.image}
                          />
                          <div className={styles.imageCaption}>
                            <p>{image.fileName || "No Name"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.infoGrid}>
                      {fields.map((field, fieldIndex) => (
                        <div key={fieldIndex}>
                          <strong className={styles.itemTitle}>
                            {field.label}
                          </strong>
                          <p className={styles.itemValue}>
                            {item[field.key] || "N/A"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className={styles.infoGrid}>
                {fields.map((field, index) => (
                  <div key={index}>
                    <strong className={styles.itemTitle}>{field.label}</strong>
                    <p className={styles.itemValue}>
                      {data && field.key in data ? data[field.key] : "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ReviewCollapsePanel;