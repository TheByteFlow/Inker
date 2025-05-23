import React from 'react';
import FilerobotImageEditor, {
    TABS,
} from 'react-filerobot-image-editor';

export interface ImageEditorProps {
    imageUrl: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (editedImageUrl: string, editedImageFile: File) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
    imageUrl,
    isOpen,
    onClose,
    onSave,
}) => {
    if (!isOpen || !imageUrl) return null;

    const handleSave = (editedImageObject: { imageBase64?: string; fullName?: string }) => {
        const { imageBase64, fullName } = editedImageObject;

        if (!imageBase64 || !fullName) {
            console.error('Edited image data is incomplete');
            onClose();
            return;
        }

        const base64Response = fetch(imageBase64);
        base64Response.then(res => res.blob()).then(blob => {
            const file = new File([blob], fullName, { type: blob.type });

            onSave(imageBase64, file);
            onClose();
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="flex h-full w-full items-center justify-center p-4">
                    <FilerobotImageEditor
                        savingPixelRatio={1}
                        previewPixelRatio={0.5}
                        source={imageUrl}
                        onSave={handleSave}
                        onClose={onClose}
                        tabsIds={[
                            TABS.ADJUST,
                            TABS.FILTERS,
                            TABS.FINETUNE,
                            TABS.ANNOTATE,
                            TABS.RESIZE,
                        ]}
                        defaultTabId={TABS.ADJUST}
                        Crop={{
                            presetsItems: [
                                { titleKey: 'custom', descriptionKey: 'Custom', ratio: undefined },
                                { titleKey: 'square', descriptionKey: '1:1', ratio: 1 },
                                { titleKey: 'landscape', descriptionKey: '16:9', ratio: 16 / 9 },
                                { titleKey: 'portrait', descriptionKey: '9:16', ratio: 9 / 16 },
                                { titleKey: 'standard', descriptionKey: '4:3', ratio: 4 / 3 },
                            ],
                        }}
                        Rotate={{ angle: 90, componentType: 'slider' }}
                        Text={{ text: 'Add text here...' }}
                        annotationsCommon={{ fill: '#ff0000' }}
                    />

                </div>
            </div>
        </div>
    );
};