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
          placeholder={"Tìm kiếm"}
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
                    onSetBank("- tất cả -");
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
    name:'Ngân hàng Ngoại thương (Vietcombank)"', code:'VIETCOMBANK', id:'1',
  },
  {
    name:'Ngân hàng Công thương (Vietinbank)', code:'VIETINBANK', id:'2',
  },
  {
    name:'Ngân hàng đầu tư và phát triển Việt Nam (BIDV)', code:'BIDV', id:'3',
  },
  {
    name:'Ngân hàng Nông nghiệp (Agribank)', code:'AGRIBANK', id:'4',
  },
  {
    name:'Ngân hàng TMCP Sài Gòn Thương Tín (SacomBank)', code:'SACOMBANK', id:'5',
  },
  {
    name:'Ngân hàng Kỹ thương Việt Nam (TechcomBank)', code:'TECHCOMBANK', id:'6',
  },
  {
    name:'Ngân hàng ACB', code:'ACB', id:'7',
  },
  {
    name:'Ngân hàng Việt Nam Thịnh vượng (VPBank)', code:'VPBANK', id:'8',
  },
  {
    name:'Ngân hàng Đông Á (DongABank)', code:'DONGABANK', id:'9',
  },
  {
    name:'Ngân hàng EximBank', code:'EXIMBANK', id:'10',
  },
  {
    name:'Ngân hàng Tiên Phong (TPBank)', code:'TPBANK', id:'11',
  },
  {
    name:'Ngân hàng Quốc dân (NCB)', code:'NCB', id:'12',
  },
  {
    name:'Ngân hàng Đại Dương (OceanBank)', code:'OJB', id:'13',
  },
  {
    name:'Ngân hàng Hàng Hải (MSBANK)', code:'MSBANK', id:'14',
  },
  {
    name:'Ngân hàng HDBank', code:'HDBANK', id:'15',
  },
  {
    name:'Ngân hàng Nam Á (NamABank)', code:'NAMABANK', id:'16',
  },
  {
    name:'Ngân hàng Phương Đông (OCB)', code:'OCB', id:'17',
  },
  {
    name:'Thẻ quốc tế Visa', code:'VISA', id:'18',
  },
  {
    name:'Ngân hàng TMCP Sài Gòn (SCB)', code:'SCB', id:'19',
  },
  {
    name:'Ngân hàng TNHH Indovina (IVB)', code:'IVB', id:'20',
  },
  {
    name:'Ngân hàng thương mại cổ phần An Bình (ABBANK)', code:'ABBANK', id:'21',
  },
  {
    name:'Ngân hàng Thương mại cổ phần Sài Gòn (SHB)', code:'SHB', id:'22',
  },
  {
    name:'Ngân hàng Thương mại cổ phần Quốc tế Việt Nam (VIB)', code:'VIB', id:'23',
  },
  {
    name:'Ngân Hàng Bản Việt', code:'VIETCAPITALBANK', id:'24',
  },
  {
    name:'Ngân hàng TMCP Đại Chúng Việt Nam', code:'PVCOMBANK', id:'25',
  },
  {
    name:'Ngân hàng thương mại cổ phần Sài Gòn Công Thương', code:'SAIGONBANK', id:'26',
  },
  {
    name:'Ngân hàng thương mại cổ phần Quân đội', code:'MBBANK', id:'27',
  },
  {
    name:'Ngân Hàng TMCP Bắc Á', code:'BACABANK', id:'28',
  },
  {
    name:'Ngân Hàng Shinhan Bank', code:'SHINHANBANK', id:'29',
  },
]
