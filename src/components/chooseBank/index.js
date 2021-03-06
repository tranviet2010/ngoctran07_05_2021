import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { GetDistrictChild } from "../../service/countries";
import { searchByText } from "../../utils/helper/common.helper";
import SearchComponent from "../search";
import Spinner from "react-native-loading-spinner-overlay";
import { sizeHeight, sizeFont } from "../../utils/helper/size.helper";
import styles from "../../views/orders/style";
import ItemCommon from "../itemFlat";
import { ElementCustom } from "../error";

export default class ChooseBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataBANK,
      loading: false,
      messsage: "",
      search: "",
      name: [],
    };
    //this.nameCity = [];
  }
  // async componentDidMount() {
  //   const { GHN_TINHID } = this.props.route.params;
  //   await GetDistrictChild({ ID_DISTRICT: GHN_TINHID })
  //     .then((result) => {
  //       if (result.data.ERROR == "0000") {
  //         this.setState(
  //           {
  //             data: result.data.INFO,
  //           },
  //           () => {
  //             this.setState({ loading: false });
  //           }
  //         );
  //       } else {
  //         this.setState({ loading: false });
  //       }
  //     })
  //     .catch((error) => {
  //       this.setState({ loading: false });
  //     });

  //   // for (let i = 0; i < this.state.data.length; i++) {
  //   //   this.nameCity.push(this.state.data[i].NAME);
  //   // }
  // }
  SearchCity = () => {
    const { data, search } = this.state;
    if (search == "") {
      this.setState({ name: [] });
    } else {
      let name = searchByText(data, search);
      this.setState({ name: name });
    }
    //return this.nameCity;
  };
  render() {
    const { loading, search } = this.state;
    const { onSetBank } = this.props.route.params;

    return loading ? (
      <Spinner visible={loading} customIndicator={<ElementCustom />} />
    ) : (
      <View style={styles.viewTouchCommon}>
        <SearchComponent
          name="search"
          color="#999"
          size={sizeFont(4)}
          value={search}
          placeholder={"T??m ki???m"}
          onChangeText={(text) => {
            this.setState({ search: text }, () => {
              this.SearchCity(search);
            });
          }}
          isIcon={false}
          onSearch={this.SearchCity}
        />
        <View
          style={{ marginTop: sizeHeight(2), marginBottom: sizeHeight(15) }}
        >
          <FlatList
            data={dataBANK}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            ListHeaderComponent={() => {
              return (
                <ItemCommon
                  title="- None -"
                  name="chevron-right"
                  onPress={() => {
                    onSetBank("- t???t c??? -");
                    this.props.navigation.goBack();
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <ItemCommon
                  title={item.name}
                  name="chevron-right"
                  onPress={() => {
                    onSetBank(item);
                    this.props.navigation.goBack();
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

const dataBANK = [
  {
    name:'Ng??n h??ng Ngo???i th????ng (Vietcombank)"', code:'VIETCOMBANK', id:'1',
  },
  {
    name:'Ng??n h??ng C??ng th????ng (Vietinbank)', code:'VIETINBANK', id:'2',
  },
  {
    name:'Ng??n h??ng ?????u t?? v?? ph??t tri???n Vi???t Nam (BIDV)', code:'BIDV', id:'3',
  },
  {
    name:'Ng??n h??ng N??ng nghi???p (Agribank)', code:'AGRIBANK', id:'4',
  },
  {
    name:'Ng??n h??ng TMCP S??i G??n Th????ng T??n (SacomBank)', code:'SACOMBANK', id:'5',
  },
  {
    name:'Ng??n h??ng K??? th????ng Vi???t Nam (TechcomBank)', code:'TECHCOMBANK', id:'6',
  },
  {
    name:'Ng??n h??ng ACB', code:'ACB', id:'7',
  },
  {
    name:'Ng??n h??ng Vi???t Nam Th???nh v?????ng (VPBank)', code:'VPBANK', id:'8',
  },
  {
    name:'Ng??n h??ng ????ng ?? (DongABank)', code:'DONGABANK', id:'9',
  },
  {
    name:'Ng??n h??ng EximBank', code:'EXIMBANK', id:'10',
  },
  {
    name:'Ng??n h??ng Ti??n Phong (TPBank)', code:'TPBANK', id:'11',
  },
  {
    name:'Ng??n h??ng Qu???c d??n (NCB)', code:'NCB', id:'12',
  },
  {
    name:'Ng??n h??ng ?????i D????ng (OceanBank)', code:'OJB', id:'13',
  },
  {
    name:'Ng??n h??ng H??ng H???i (MSBANK)', code:'MSBANK', id:'14',
  },
  {
    name:'Ng??n h??ng HDBank', code:'HDBANK', id:'15',
  },
  {
    name:'Ng??n h??ng Nam ?? (NamABank)', code:'NAMABANK', id:'16',
  },
  {
    name:'Ng??n h??ng Ph????ng ????ng (OCB)', code:'OCB', id:'17',
  },
  {
    name:'Th??? qu???c t??? Visa', code:'VISA', id:'18',
  },
  {
    name:'Ng??n h??ng TMCP S??i G??n (SCB)', code:'SCB', id:'19',
  },
  {
    name:'Ng??n h??ng TNHH Indovina (IVB)', code:'IVB', id:'20',
  },
  {
    name:'Ng??n h??ng th????ng m???i c??? ph???n An B??nh (ABBANK)', code:'ABBANK', id:'21',
  },
  {
    name:'Ng??n h??ng Th????ng m???i c??? ph???n S??i G??n (SHB)', code:'SHB', id:'22',
  },
  {
    name:'Ng??n h??ng Th????ng m???i c??? ph???n Qu???c t??? Vi???t Nam (VIB)', code:'VIB', id:'23',
  },
  {
    name:'Ng??n H??ng B???n Vi???t', code:'VIETCAPITALBANK', id:'24',
  },
  {
    name:'Ng??n h??ng TMCP ?????i Ch??ng Vi???t Nam', code:'PVCOMBANK', id:'25',
  },
  {
    name:'Ng??n h??ng th????ng m???i c??? ph???n S??i G??n C??ng Th????ng', code:'SAIGONBANK', id:'26',
  },
  {
    name:'Ng??n h??ng th????ng m???i c??? ph???n Qu??n ?????i', code:'MBBANK', id:'27',
  },
  {
    name:'Ng??n H??ng TMCP B???c ??', code:'BACABANK', id:'28',
  },
  {
    name:'Ng??n H??ng Shinhan Bank', code:'SHINHANBANK', id:'29',
  },
]
