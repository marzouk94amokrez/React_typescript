import { LayoutElement } from "@/api/data/layoutElement";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { useCallback, useEffect, useState } from "react"
export default function Index() {
  const [model, setModel] = useState<Model | undefined>();
  const [modelFields, setModelFields] = useState<Map<string, ModelField> | undefined>(undefined);
  const [modelLayouts, setModelLayouts] = useState<LayoutElement[]>([]);
  const [layoutActions, setLayoutActions] = useState<any>({});
  
  return (
    <div className="w-full">

    </div>
  );
}
