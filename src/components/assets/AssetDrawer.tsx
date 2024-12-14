import { EntityDrawer } from "@/components/common/EntityDrawer"
import type { Asset } from "@/types/asset"

interface AssetDrawerProps {
  asset: Asset | null
  open: boolean
  onClose: () => void
  onAssetUpdated: () => void
}

const ASSET_FIELDS = [
  {
    name: "asset_name",
    label: "Asset Name",
    type: "text" as const,
    required: true
  },
  {
    name: "asset_size",
    label: "Size",
    type: "text" as const,
    required: true
  },
  {
    name: "asset_type",
    label: "Asset Type",
    type: "select" as const,
    required: true,
    options: [
      { value: "Speed Boat", label: "Speed Boat" },
      { value: "Sailboat", label: "Sailboat" },
      { value: "Fishing Boat", label: "Fishing Boat" },
      { value: "Pontoon Boat", label: "Pontoon Boat" },
      { value: "Yacht", label: "Yacht" },
      { value: "Jet Ski", label: "Jet Ski" },
      { value: "Other", label: "Other" }
    ]
  },
  {
    name: "slip_id",
    label: "Slip ID",
    type: "number" as const,
    required: true
  }
]

export function AssetDrawer({
  asset,
  open,
  onClose,
  onAssetUpdated
}: AssetDrawerProps) {
  return (
    <EntityDrawer
      entity={asset}
      open={open}
      onClose={onClose}
      onEntityUpdated={onAssetUpdated}
      title="Asset"
      fields={ASSET_FIELDS}
      tableName="assets"
    />
  )
}