import { useMemo, useState } from "react";
import { useGetAllHelpContentQuery } from "../../data/rtkApis/helpContentApi";
import { PageHeader } from "../../components/Navigation/PageHeader/PageHeader";
import { FEHelpContent } from "../../interfaces";
import { HelpItemCard } from "../../components/PageComponents/HelpItemCard/HelpItemCard";
import { NoResultCard } from "../../components/BaseComponents/NoResultCard/NoResultCard";
import { HelpContentModal } from "../../components/Modals/HelpContentModal/HelpContentModal";
import { DefaultButton } from "../../components/BaseComponents/DefaultButton/DefaultButton";

export const HelpPage = () => {
  // State
  const [selectedContentRef, setSelectedContentRef] = useState("");

  // Hooks
  const { data: contentData, refetch } = useGetAllHelpContentQuery();

  const helpItems: FEHelpContent[] = useMemo(() => {
    try {
      const { data } = contentData as { [key: string]: any };
      return data as FEHelpContent[];
    } catch (e) {
      return [];
    }
    return [];
  }, [contentData]);

  const selectedContent: FEHelpContent | undefined = useMemo(() => {
    if (!selectedContentRef || !helpItems.length) return undefined;
    return helpItems.find((el) => el._id === selectedContentRef);
  }, [selectedContentRef, helpItems]);

  return (
    <div className="p-4">
      <PageHeader title="Help & Support" rightActions={<><DefaultButton active label="Refresh" onClick={() => refetch()} /></>} />
      <div>
        {helpItems.length ? (
          helpItems.map((item) => (
            <HelpItemCard
              key={`help-${item._id}`}
              helpItem={item}
              onClick={() => setSelectedContentRef(item._id)}
            />
          ))
        ) : (
          <NoResultCard />
        )}
      </div>

      {selectedContent && (
        <HelpContentModal
          modalHeaderProps={{
            title: `${selectedContent.title}`,
            onClose: () => {
              setSelectedContentRef("");
            },
          }}
          helpContent={selectedContent}
          visible
        />
      )}
    </div>
  );
};
