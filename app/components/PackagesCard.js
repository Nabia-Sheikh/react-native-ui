import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AppText from "./AppText";
import colors from "../config/colors";
import PackagesApi from "../api/Packages";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../auth/context";

const PackagesCard = ({ category }) => {
  const [packages, setPackages] = useState([]);
  const { setSelectedPkg } = useContext(AuthContext);

  const handlePackageSelect = (pkg) => {
    setSelectedPkg(pkg);
    alert(pkg.name + " package Selected");
  };

  const getPackages = async () => {
    try {
      const response = await PackagesApi.getPackagesByCategory();
      setPackages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [category]);

  useEffect(() => {
    packages.sort((a, b) => a.price - b.price);
  }, [packages]);

  return (
    <View>
      <ScrollView horizontal>
        {packages && (
          <View style={styles.container}>
            {packages.map(
              (pkg) =>
                pkg.category === category && (
                  <TouchableOpacity
                    key={pkg}
                    style={styles.package}
                    onPress={() => handlePackageSelect(pkg)}
                  >
                    <View style={styles.packageHeading}>
                      <AppText style={styles.packageName}>{pkg.name}</AppText>
                      <AppText style={styles.packagePrice}>
                        Rs. {pkg.price}/=
                      </AppText>
                      <AppText style={styles.packageCategory}>
                        {pkg.category}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                )
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PackagesCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  package: {
    width: 150,
    height: 150,
    backgroundColor: colors.medium,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 5,
    paddingTop: 10,
  },
  packageName: {
    textAlign: "center",
    color: colors.white,
    fontSize: 25,
    fontWeight: "500",
  },
  packagePrice: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
    marginVertical: 10,
  },
  packageCategory: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary,
    paddingBottom: 10,
  },
});
