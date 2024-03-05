import React, { useCallback, useEffect, useState } from "react";
import { useTranslate } from "@/providers/translate.provider";
import { CollectionAttribute, NftCollection } from "@/types/blockchain.type";
import Collapse from "@/components/Common/Collapse";
import Button from "@/components/Common/Button";
import MultiSelect from "@/components/Common/MultiSelect";
import { useGetCollectionAttributesMutation } from "@/api/blockchainApi";
import { MultiValue } from "react-select";

type TrendingAttributesType = {
    type: string,
    value: string,
    selected: boolean,
    onSelect: (type: string, itemValue: string) => void,
}

const TrendingAttributes = ({ type, value, selected, onSelect }: TrendingAttributesType) => {
    return (
        <div className={`
        px-4 py-2 rounded-[5px] max-w-[269px] cursor-pointer
        border flex flex-col text-14 font-normal text-nowrap ${selected ? "border-orange" : "border-sp-gray-700"}
        `}
            onClick={() => onSelect(type, value)}
        >
            <p className="text-orange">{type}</p>
            <p>{value}</p>
        </div>
    );
};
//TODO: remove on backend ready
const attributes = [
    {
        type: "Head",
        items: [
            {
                value: "Football pattern",
                selected: false,
                isTrend: true,
            },
        ],
    },
    {
        type: "Lips",
        items: [
            {
                value: "White",
                selected: false,
                isTrend: true,
            },
        ],
    },
    {
        type: "Jersey",
        items: [
            {
                value: "Brazil",
                selected: false,
                isTrend: true,
            },
            {
                value: "Romania",
                selected: false,
                isTrend: false,
            },
            {
                value: "Tunisia",
                selected: false,
                isTrend: false,
            },
            {
                value: "Germany",
                selected: false,
                isTrend: false,
            },
        ],
    },
    {
        type: "Head accessories",
        items: [
            {
                value: "Black Cowboy hat",
                selected: false,
                isTrend: true,
            },
        ],
    },
];

type AttrCheckboxProps = {
    label: string,
    checked: boolean,
    onChange: () => void,
};
const AttrCheckbox = ({ label, checked, onChange }: AttrCheckboxProps) => (
    <div className="flex items-center gap-2 text-14 text-sp-gray-950">
        <input
            checked={checked}
            id={`${label}-checkbox`}
            type="checkbox"
            onChange={onChange}
            className={`appearance-none w-3 h-3 rounded-sm border border-sp-gray-950 bg-transparent 
                    checked:bg-orange checked:border-0
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    disabled:border-steel-400 disabled:bg-steel-400
        `}
        />
        {label && <label htmlFor={`${label}-checkbox`}>{label}</label>}
    </div>

);

export type SidebarFiltersType = {
    attributes?: CollectionAttribute[];
    price?: {
        min?: string;
        max?: string;
    }
};


type SelectOption = {
    label: string;
    value: string;
    type: string;
    selected: boolean;
}

type SidebarProps = {
    onChange: (filter: SidebarFiltersType) => void,
    collection: NftCollection,
    isLoading?: boolean,
};

const Sidebar = ({ onChange, collection, isLoading }: SidebarProps) => {
    const { _t } = useTranslate();
    const [getCollectionAttributes] = useGetCollectionAttributesMutation();

    const [filterAttributes, setFilterAttributes] = useState<CollectionAttribute[]>(attributes);
    const [filterMinPrice, setFilterMinPrice] = useState<string>('');
    const [filterMaxPrice, setFilterMaxPrice] = useState<string>('');
    const [multiSelectValue, setMultiSelectValue] = useState<MultiValue<any>>([]);
    const [multiSelectOptions, setMultiSelectOptions] = useState<SelectOption[]>([]);

    const fetchAttributes = useCallback(() => {
        getCollectionAttributes({
            tokenId: collection.token_id
        })
            .unwrap()
            .then((response) => {
                const { attributes } = response;
                setFilterAttributes(attributes);
            })
            .catch();
    }, [collection]);


    const selectAttributesHandler = (type: string, itemValue: string, selected?: boolean) => {
        const newFilterAttributes: CollectionAttribute[] = [...filterAttributes];
        newFilterAttributes.map((attr) => {
            if (attr.type === type) {
                attr.items.map((item) => {
                    if (item.value === itemValue) {
                        if (typeof selected != 'undefined') {
                            item.selected = selected;
                        } else {
                            if (item.selected) {
                                let newSelectValues: MultiValue<any> = [];
                                newSelectValues = multiSelectValue.filter((option) => option.selected);
                                setMultiSelectValue(newSelectValues);
                            }
                            item.selected = !item.selected;
                        }
                        return item;
                    }
                })
            }
            return attr;
        });
        setFilterAttributes(newFilterAttributes);
    };

    const updateHandler = () => {
        const selectedFilterAttributes: CollectionAttribute[] = [];
        filterAttributes.forEach((attr) => {
            const selectedItems = attr.items.filter((item) => item.selected);
            if (selectedItems.length) {
                selectedFilterAttributes.push({
                    type: attr.type,
                    items: selectedItems,
                })
            }
        });

        const filters: SidebarFiltersType = {};
        if (selectedFilterAttributes.length) filters.attributes = selectedFilterAttributes;
        if (filterMinPrice) {
            filters.price = { min: filterMinPrice };
        }
        if (filterMaxPrice) {
            filters.price = { ...filters.price, max: filterMaxPrice };
        }
        onChange(filters);
    };

    const updateMultiSelectOptions = () => {
        const options: SelectOption[] = [];
        if (filterAttributes.length) {
            filterAttributes.forEach((attr) => {
                attr.items.forEach((item) => {
                    options.push({
                        label: item.value,
                        value: item.value,
                        type: attr.type,
                        selected: item.selected!,
                    });
                })
            })
        }
        setMultiSelectOptions(options);
    };

    useEffect(() => {
        //TODO: update on backend ready
        //fetchAttributes();
    }, [collection]);

    useEffect(() => {
        updateMultiSelectOptions();
    }, [filterAttributes]);

    return (
        <div className="flex w-[390px] border-sp-gray border-r rtl:border-l flex-col">

            <div className="px-[36px]">
                <div className="mt-5">
                    <p className="text-16 font-normal">{_t("Trending attributes")}</p>
                    <div className="flex items-center flex-wrap gap-3 mt-4">
                        {filterAttributes.map((attr, index) => (
                            attr.items.map((item, index) => {
                                if (item.isTrend) {
                                    return (
                                        <TrendingAttributes
                                            type={attr.type}
                                            value={item.value}
                                            key={`tr-attr-${index}`}
                                            selected={item.selected!}
                                            onSelect={selectAttributesHandler}
                                        />)
                                } else {
                                    <></>
                                }
                            })
                        ))}
                    </div>

                    <MultiSelect
                        value={multiSelectValue}
                        onChange={(newValue, actionMeta) => {
                            setMultiSelectValue(newValue);
                            switch (actionMeta.action) {
                                case 'select-option':
                                    selectAttributesHandler(actionMeta.option.type, actionMeta.option.value, true);
                                    break;
                                case 'remove-value':
                                    selectAttributesHandler(actionMeta.removedValue.type, actionMeta.removedValue.value, false);
                                    break;
                                default:
                                    break;
                            }
                        }}
                        placeholder="Find attributes..."
                        className="w-full bg-sp-gray-600 rounded-[5px] my-5"
                        options={multiSelectOptions}
                    />

                </div>
                <div className="mt-5">
                    <p className="text-16 font-normal">{_t("All attributes")}</p>
                    <div className="flex flex-col items-center mt-4">
                        {filterAttributes.map((attr, index) => (
                            <Collapse
                                label={attr.type}
                                containerClassNames="pt-1"
                                key={`${attr.type}-${index}`}
                            >
                                <div className="px-4 pt-2 pb-1 max-h-[120px] overflow-auto scrollbar scrollbar-w-[4px] scrollbar-h-[40px] scrollbar-thumb-sp-gray-600 scrollbar-track-gray-10">
                                    {attr.items.map((item) => (
                                        <AttrCheckbox
                                            key={`${item.value}-${index}`}
                                            label={item.value}
                                            checked={item.selected!}
                                            onChange={() => selectAttributesHandler(attr.type, item.value)}
                                        />
                                    ))}
                                </div>
                            </Collapse>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-[36px] border-sp-gray border-t mt-8">
                <p className="text-16 font-normal mt-8">{_t("Price range")}</p>
                <div className="flex items-center justify-between mt-3">
                    <input
                        className="max-w-[144px] rounded-[5px] bg-sp-gray-600 border-none focus:ring-orange-hover placeholder:sp-gray-950"
                        type="number"
                        onChange={(event) => setFilterMinPrice(event.target.value)}
                        value={filterMinPrice}
                        placeholder="Min"
                    />
                    <input
                        className="max-w-[144px] rounded-[5px] bg-sp-gray-600 border-none focus:ring-orange-hover placeholder:sp-gray-950"
                        type="number"
                        onChange={(event) => setFilterMaxPrice(event.target.value)}
                        value={filterMaxPrice}
                        placeholder="Max"
                    />
                </div>
                <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    className="mt-8 text-white w-full h-[40px] rounded-[5px]"
                    onClick={() => updateHandler()}
                    label={_t("Update")}
                />
            </div>
        </div>
    )
};

export default Sidebar;